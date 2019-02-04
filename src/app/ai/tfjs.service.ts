import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Environment, losses, train } from '@tensorflow/tfjs';
import { DEF_OPTIMIZER, detectPolynom } from 'app/ai/ml-polynomial';
import { modelDispose, modelOutput, modelPolynomCreate, modelPolynomTrain, modelPredict } from 'app/ai/ml-polynomial-model';
import { RxStateService } from 'app/rx-state';
import { RxStateSetUiAiService } from 'app/rx-state/rx-state-set-ui-ai.service';
import { MlPolynomialState } from 'app/rx-state/state/state-ai';
import { DoneSubject, RxCleanup, rxFalse_, rxFire, rxFire_, rxNext_, rxTrue_ } from 'dd-rxjs';
import { BehaviorSubject, from, merge, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, filter, finalize, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TfjsService implements OnDestroy, OnInit {
  constructor(
    private readonly rxState: RxStateService,
    private readonly rxStateMutate: RxStateSetUiAiService,
  ) {
    this.ngOnInit();
  }

  @RxCleanup() private readonly done$ = new DoneSubject();
  @RxCleanup() private readonly triggerSync$ = new Subject();
  @RxCleanup() private readonly trainMlPolynomialReset$ = new Subject();
  @RxCleanup() private readonly trainMlPolynomialSteps$ = new Subject<number>();

  private readonly stateMlPolynomial$ = this.rxState.watch(state => state.ui.ai.mlPolynomial, this.done$);

  @RxCleanup() readonly busy$ = new BehaviorSubject(false);
  @RxCleanup() readonly error$ = new Subject<any>();
  @RxCleanup() readonly tfLosses$ = new BehaviorSubject(Object.keys(losses));
  @RxCleanup() readonly tfOptimizers$ = new BehaviorSubject(Object.keys(train));

  triggerSync = rxFire_(this.triggerSync$);
  trainMlPolynomial = rxNext_(this.trainMlPolynomialSteps$);
  trainMlPolynomialReset = rxFire_(this.trainMlPolynomialReset$);

  ngOnDestroy() { }

  ngOnInit() {
    this.rxStateMutate.setMlPolynomialOptimizer(DEF_OPTIMIZER);

    this.triggerSync$.subscribe(() => {
      this.rxStateMutate.setTfjsBackend(Environment.getBackend());
      this.rxStateMutate.setTfjsMemory(Environment.memory());
    });

    merge(this.busy$.pipe(distinctUntilChanged(), filter(_ => !_))).subscribe(rxFire_(this.triggerSync$));

    merge(
      this.trainMlPolynomialReset$.pipe(withLatestFrom(this.stateMlPolynomial$), map(([_, state]) => state.factorsTrained.map(() => 0))),
      this.trainMlPolynomialSteps$
        .pipe(
          withLatestFrom(this.busy$, this.stateMlPolynomial$),
          filter(([steps, busy, state]) => !busy && steps > 0 && !!state),
          switchMap(([steps, _, state]) => this.trainMlPolynomial$_(steps, state))))
      .subscribe(this.rxStateMutate.setMlPolynomialFactorsTrained);

    rxFire(this.triggerSync$);
  }

  train = async () => {
    if (this.busy$.value) {
      return;
    }
    this.busy$.next(true);
    const model = modelPolynomCreate({});
    await modelPolynomTrain({ model, loops: 250, weights: [0, 0], xyFlatData: [-1, 0, 1, 2, 3, 4].reduce((acc, val, ii) => [...acc, val, [-3, -1, 1, 3, 5, 7][ii]], []) });
    const predict = await modelPredict({ model, xx: [20] });
    console.log('predict', predict);
    const result = await modelOutput(model);
    console.log('read', result);
    modelDispose(model);
    console.log('disposed', Environment.memory());
    this.busy$.next(false);
  }

  private trainMlPolynomial$_ = (steps: number, state: MlPolynomialState) => of({ steps, state })
    .pipe(
      tap(rxTrue_(this.busy$)),
      switchMap(_ => from(
        detectPolynom(
          {
            initialWeights: _.state.factorsTrained,
            learningRate: _.state.learningRate,
            loops: _.steps,
            optimizer: _.state.optimizer,
            xyFlatData: _.state.pointsCurrent,
          }))
        .pipe(catchError(err => {
          this.error$.next(err);
          return of(_.state.factorsTrained.map(() => 0));
        }))),
      finalize(rxFalse_(this.busy$)));
}
