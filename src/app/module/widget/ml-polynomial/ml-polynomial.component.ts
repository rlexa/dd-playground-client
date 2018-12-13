import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { generatePolynomialPoints, TfjsService } from 'app/ai';
import { ReduxService, ReduxSetUiAiService } from 'app/redux';
import { trackByIndex } from 'app/util';
import { DoneSubject, RxCleanup, rxFire_ } from 'dd-rxjs';
import { Subject } from 'rxjs';
import { debounceTime, map, shareReplay, takeUntil, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-ml-polynomial',
  templateUrl: './ml-polynomial.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MlPolynomialComponent implements OnDestroy, OnInit {
  constructor(
    private readonly redux: ReduxService,
    private readonly reduxSet: ReduxSetUiAiService,
    private readonly tf: TfjsService,
  ) { }

  @RxCleanup() private readonly done$ = new DoneSubject();
  @RxCleanup() private readonly triggerGeneratePoints$ = new Subject();

  private readonly generatePointsNum$ = this.redux.watch(state => state.ui.ai.mlPolynomial.generatePointsNum, this.done$);
  private readonly generatePointsRangeFrom$ = this.redux.watch(state => state.ui.ai.mlPolynomial.generatePointsRangeFrom, this.done$);
  private readonly generatePointsRangeTo$ = this.redux.watch(state => state.ui.ai.mlPolynomial.generatePointsRangeTo, this.done$);

  readonly factorRange = 10;
  readonly colors = ['rgba(0, 0, 255, 200)', 'rgba(255, 100, 100, 255)'];
  readonly trackByIndex = trackByIndex;

  readonly busy$ = this.tf.busy$.pipe(shareReplay());
  readonly optimizers$ = this.tf.tfOptimizers$;

  readonly factorsCurrent$ = this.redux.watch(state => state.ui.ai.mlPolynomial.factorsCurrent, this.done$);
  readonly factorsTrained$ = this.redux.watch(state => state.ui.ai.mlPolynomial.factorsTrained, this.done$);
  readonly learningRate$ = this.redux.watch(state => state.ui.ai.mlPolynomial.learningRate, this.done$);
  readonly pointsCurrent$ = this.redux.watch(state => state.ui.ai.mlPolynomial.pointsCurrent, this.done$);
  readonly optimizer$ = this.redux.watch(state => state.ui.ai.mlPolynomial.optimizer, this.done$);
  readonly tfjsState$ = this.redux.watch(state => ({ backend: state.ui.ai.tfjs.backend, ...state.ui.ai.tfjs.memory }), this.done$);

  generatePoints = rxFire_(this.triggerGeneratePoints$);
  resetTrained = this.tf.trainMlPolynomialReset;
  setLearningRate = this.reduxSet.setMlPolynomialLearningRate;
  setOptimizer = this.reduxSet.setMlPolynomialOptimizer;
  trainMlPolynomial = this.tf.trainMlPolynomial;

  ngOnDestroy() { }

  ngOnInit() {
    this.tf.error$.pipe(takeUntil(this.done$)).subscribe(console.log);

    this.triggerGeneratePoints$
      .pipe(
        withLatestFrom(this.factorsCurrent$, this.generatePointsNum$, this.generatePointsRangeFrom$, this.generatePointsRangeTo$),
        debounceTime(0),
        map(([_, weights, points, xFrom, xTo]) => generatePolynomialPoints({ weights, points, xFrom, xTo })))
      .subscribe(this.reduxSet.setMlPolynomialPointsCurrent);

    this.factorsCurrent$.subscribe(rxFire_(this.triggerGeneratePoints$));

    this.tf.triggerSync();
  }

  updateFactor = (factors: number[], index: number, val: number, elem: HTMLInputElement) =>
    this.reduxSet.setMlPolynomialFactorsCurrent(
      factors.map((ii, _index) => {
        let ret = ii;
        if (_index === index) {
          ret = Math.min(Math.max(val || 0, -this.factorRange), this.factorRange);
          elem.value = ret.toString(); // immediate normalization
        }
        return ret;
      }));
}
