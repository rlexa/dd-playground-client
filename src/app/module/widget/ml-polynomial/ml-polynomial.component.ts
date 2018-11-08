import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { DEF_OPTIMIZER, detectPolynom, generatePolynomialPoints, OPTIMIZERS } from 'app/ai';
import { ReduxService, ReduxSetUiAiService } from 'app/redux';
import { trackByIndex } from 'app/util';
import { DoneSubject, RxCleanup } from 'dd-rxjs';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-ml-polynomial',
  templateUrl: './ml-polynomial.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MlPolynomialComponent implements OnDestroy, OnInit {
  constructor(
    private readonly redux: ReduxService,
    private readonly reduxSet: ReduxSetUiAiService,
  ) { }

  private readonly numPoints = 20;
  private readonly xRange = 1;
  @RxCleanup() private readonly triggerDoPoints$ = new Subject();
  @RxCleanup() private readonly done$ = new DoneSubject();

  readonly factorRange = 10;
  readonly colors = ['rgba(0, 0, 255, 200)', 'rgba(255, 100, 100, 255)'];
  readonly trackByIndex = trackByIndex;
  readonly optimizers = OPTIMIZERS;
  readonly optimizerDef = DEF_OPTIMIZER;
  @RxCleanup() readonly isBusy$ = new BehaviorSubject(false);

  factorsCurrent$ = this.redux.watch(state => state.ui.ai.mlPolynomial.factorsCurrent, this.done$).pipe(tap(() => this.triggerDoPoints$.next()));
  factorsTrained$ = this.redux.watch(state => state.ui.ai.mlPolynomial.factorsTrained, this.done$);
  learningRate$ = this.redux.watch(state => state.ui.ai.mlPolynomial.learningRate, this.done$);
  pointsCurrent$ = this.redux.watch(state => state.ui.ai.mlPolynomial.pointsCurrent, this.done$);
  optimizer$ = this.redux.watch(state => state.ui.ai.mlPolynomial.optimizer, this.done$);

  ngOnDestroy() { }

  ngOnInit() {
    this.triggerDoPoints$.pipe(debounceTime(1)).subscribe(() => this.doGeneratePoints());
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
  updateLearningRate = (val: number) => this.reduxSet.setMlPolynomialLearningRate(val);
  updateOptimizer = (val: string) => this.reduxSet.setMlPolynomialOptimizer(val);

  resetTrained = () => this.reduxSet.setMlPolynomialFactorsTrained(this.redux.state.ui.ai.mlPolynomial.factorsTrained.map(ii => 0));
  generatePoints = () => this.triggerDoPoints$.next();

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
    }
  }

  private doGeneratePoints = () =>
    this.reduxSet.setMlPolynomialPointsCurrent(
      generatePolynomialPoints({
        weights: this.redux.state.ui.ai.mlPolynomial.factorsCurrent,
        points: this.numPoints,
        xFrom: 0,
        xTo: this.xRange
      }));
}
