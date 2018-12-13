import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Environment, train } from '@tensorflow/tfjs';
import { DEF_OPTIMIZER, detectPolynom } from 'app/ai/ml-polynomial';
import { ReduxService, ReduxSetUiAiService } from 'app/redux';
import { MlPolynomialState } from 'app/redux/ui/ai/ml-polynomial';
import { DoneSubject, RxCleanup, rxFalse_, rxFire, rxFire_, rxNext_, rxTrue_ } from 'dd-rxjs';
import { BehaviorSubject, from, merge, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, filter, finalize, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TfjsService implements OnDestroy, OnInit {
  constructor(
    private readonly redux: ReduxService,
    private readonly reduxSet: ReduxSetUiAiService,
  ) {
    this.ngOnInit();
  }

  @RxCleanup() private readonly done$ = new DoneSubject();
  @RxCleanup() private readonly triggerSync$ = new Subject();
  @RxCleanup() private readonly trainMlPolynomialReset$ = new Subject();
  @RxCleanup() private readonly trainMlPolynomialSteps$ = new Subject<number>();

  private readonly stateMlPolynomial$ = this.redux.watch(state => state.ui.ai.mlPolynomial, this.done$);

  @RxCleanup() readonly busy$ = new BehaviorSubject(false);
  @RxCleanup() readonly error$ = new Subject<any>();
  @RxCleanup() readonly tfOptimizers$ = new BehaviorSubject(Object.keys(train));

  triggerSync = rxFire_(this.triggerSync$);
  trainMlPolynomial = rxNext_(this.trainMlPolynomialSteps$);
  trainMlPolynomialReset = rxFire_(this.trainMlPolynomialReset$);

  ngOnDestroy() { }

  ngOnInit() {
    this.reduxSet.setMlPolynomialOptimizer(DEF_OPTIMIZER);

    this.triggerSync$.subscribe(() => {
      this.reduxSet.setTfjsBackend(Environment.getBackend());
      this.reduxSet.setTfjsMemory(Environment.memory());
    });

    merge(this.busy$.pipe(distinctUntilChanged(), filter(_ => !_))).subscribe(rxFire_(this.triggerSync$));

    merge(
      this.trainMlPolynomialReset$.pipe(withLatestFrom(this.stateMlPolynomial$), map(([_, state]) => state.factorsTrained.map(() => 0))),
      this.trainMlPolynomialSteps$
        .pipe(
          withLatestFrom(this.busy$, this.stateMlPolynomial$),
          filter(([steps, busy, state]) => !busy && steps > 0 && !!state),
          switchMap(([steps, _, state]) => this.trainMlPolynomial$_(steps, state))))
      .subscribe(this.reduxSet.setMlPolynomialFactorsTrained);

    rxFire(this.triggerSync$);
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
