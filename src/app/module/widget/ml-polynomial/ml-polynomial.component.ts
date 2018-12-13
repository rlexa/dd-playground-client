import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { DEF_OPTIMIZER, detectPolynom, generatePolynomialPoints, TfjsService } from 'app/ai';
import { ReduxService, ReduxSetUiAiService } from 'app/redux';
import { trackByIndex } from 'app/util';
import { DoneSubject, RxCleanup, rxFire_ } from 'dd-rxjs';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, map, withLatestFrom } from 'rxjs/operators';

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
  readonly optimizers$ = this.tf.tfOptimizers$;
  readonly optimizerDef = DEF_OPTIMIZER;
  @RxCleanup() readonly isBusy$ = new BehaviorSubject(false);

  readonly factorsCurrent$ = this.redux.watch(state => state.ui.ai.mlPolynomial.factorsCurrent, this.done$);
  readonly factorsTrained$ = this.redux.watch(state => state.ui.ai.mlPolynomial.factorsTrained, this.done$);
  readonly learningRate$ = this.redux.watch(state => state.ui.ai.mlPolynomial.learningRate, this.done$);
  readonly pointsCurrent$ = this.redux.watch(state => state.ui.ai.mlPolynomial.pointsCurrent, this.done$);
  readonly optimizer$ = this.redux.watch(state => state.ui.ai.mlPolynomial.optimizer, this.done$);
  readonly tfjsState$ = this.redux.watch(state => ({ backend: state.ui.ai.tfjs.backend, ...state.ui.ai.tfjs.memory }), this.done$);

  generatePoints = rxFire_(this.triggerGeneratePoints$);
  setLearningRate = this.reduxSet.setMlPolynomialLearningRate;
  setOptimizer = this.reduxSet.setMlPolynomialOptimizer;

  ngOnDestroy() { }

  ngOnInit() {
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

  resetTrained = () => this.reduxSet.setMlPolynomialFactorsTrained(this.redux.state.ui.ai.mlPolynomial.factorsTrained.map(ii => 0));

  async train(steps: number) {
    if (this.isBusy$.value) {
      return;
    }
    this.isBusy$.next(true);
    try {
      const state = this.redux.state.ui.ai.mlPolynomial;
      const trained = await detectPolynom({
        initialWeights: state.factorsTrained,
        learningRate: state.learningRate,
        loops: steps,
        optimizer: state.optimizer,
        xyFlatData: state.pointsCurrent
      });
      this.reduxSet.setMlPolynomialFactorsTrained(trained);
    } finally {
      this.isBusy$.next(false);
      this.tf.triggerSync();
    }
  }
}
