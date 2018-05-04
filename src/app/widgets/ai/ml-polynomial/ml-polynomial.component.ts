import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { DEF_OPTIMIZER, OPTIMIZERS, detectPolynom, generatePolynomialPoints } from 'app/ai';
import { ReduxService } from 'app/redux';
import { BehaviorSubject, Subject } from 'app/rx';
import { trackByIndex } from 'app/widgets/util';

@Component({
  selector: 'app-ml-polynomial',
  templateUrl: './ml-polynomial.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MlPolynomialComponent implements OnDestroy, OnInit {

  private readonly numPoints = 20;
  private readonly xRange = 1;
  private readonly triggerDoPoints$ = new Subject();

  readonly factorRange = 10;
  readonly colors = ['rgba(0, 0, 255, 200)', 'rgba(255, 100, 100, 255)'];
  readonly trackByIndex = trackByIndex;
  readonly optimizers = OPTIMIZERS;
  readonly optimizerDef = DEF_OPTIMIZER;
  readonly isBusy$ = new BehaviorSubject(false);

  constructor(private readonly redux: ReduxService) { }

  factorsCurrent$ = this.redux.watch(state => state.ui.ai.mlPolynomial.factorsCurrent)
    .do(() => this.triggerDoPoints$.next());
  factorsTrained$ = this.redux.watch(state => state.ui.ai.mlPolynomial.factorsTrained);
  learningRate$ = this.redux.watch(state => state.ui.ai.mlPolynomial.learningRate);
  pointsCurrent$ = this.redux.watch(state => state.ui.ai.mlPolynomial.pointsCurrent);
  optimizer$ = this.redux.watch(state => state.ui.ai.mlPolynomial.optimizer);

  ngOnDestroy() {
    [
      this.isBusy$,
      this.triggerDoPoints$,
    ].forEach(ii => ii.complete());
  }

  ngOnInit() {
    this.triggerDoPoints$.debounceTime(1).subscribe(() => this.doGeneratePoints());
  }

  updateFactor = (factors: number[], index: number, val: number, elem: HTMLInputElement) =>
    this.redux.setMlPolynomialFactorsCurrent(
      factors.map((ii, _index) => {
        let ret = ii;
        if (_index === index) {
          ret = Math.min(Math.max(val || 0, -this.factorRange), this.factorRange);
          elem.value = ret.toString(); // immediate normalization
        }
        return ret;
      }));
  updateLearningRate = (val: number) => this.redux.setMlPolynomialLearningRate(val);
  updateOptimizer = (val: string) => this.redux.setMlPolynomialOptimizer(val);

  resetTrained = () => this.redux.setMlPolynomialFactorsTrained(this.redux.state.ui.ai.mlPolynomial.factorsTrained.map(ii => 0));
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
      this.redux.setMlPolynomialFactorsTrained(trained);
    } finally {
      this.isBusy$.next(false);
    }
  }

  private doGeneratePoints = () =>
    this.redux.setMlPolynomialPointsCurrent(
      generatePolynomialPoints({
        weights: this.redux.state.ui.ai.mlPolynomial.factorsCurrent,
        points: this.numPoints,
        xFrom: 0,
        xTo: this.xRange
      }));
}
