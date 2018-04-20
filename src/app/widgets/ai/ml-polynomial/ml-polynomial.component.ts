import { Component, OnDestroy } from '@angular/core';
import { DEF_OPTIMIZER, OPTIMIZERS, detectPolynom, generatePolynomialPoints } from 'app/ai';
import { ReduxService } from 'app/redux';
import { DoneSubject, Subject } from 'app/rx';
import { trackByIndex } from 'app/widgets/util';

@Component({
  selector: 'app-ml-polynomial',
  templateUrl: './ml-polynomial.component.html'
})
export class MlPolynomialComponent implements OnDestroy {

  private readonly numPoints = 20;
  private readonly xRange = 1;
  private readonly factorRange = 10;
  private readonly done = new DoneSubject();
  private readonly triggerDoPoints = new Subject();

  readonly colors = ['rgba(0, 0, 255, 200)', 'rgba(255, 100, 100, 255)'];
  readonly trackByIndex = trackByIndex;
  readonly optimizers = OPTIMIZERS;
  readonly optimizerDef = DEF_OPTIMIZER;

  isBusy = false;

  constructor(private readonly redux: ReduxService) {
    this.triggerDoPoints.takeUntil(this.done).debounceTime(1).subscribe(() => this.doGeneratePoints());
  }

  factorsCurrent$ = this.redux.watch(state => state.ui.ai.mlPolynomial.factorsCurrent)
    .do(() => this.triggerDoPoints.next());
  factorsTrained$ = this.redux.watch(state => state.ui.ai.mlPolynomial.factorsTrained);
  learningRate$ = this.redux.watch(state => state.ui.ai.mlPolynomial.learningRate);
  pointsCurrent$ = this.redux.watch(state => state.ui.ai.mlPolynomial.pointsCurrent);
  optimizer$ = this.redux.watch(state => state.ui.ai.mlPolynomial.optimizer);

  ngOnDestroy() { this.done.done(); }

  getFactor = (factors: number[], index: number) => factors[index];
  updateFactor = (factors: number[], index: number, val: number) =>
    this.redux.setMlPolynomialFactorsCurrent(
      factors.map((ii, _index) => _index === index ? Math.min(Math.max(val || 0, -this.factorRange), this.factorRange) : ii));
  updateLearningRate = (val: number) => this.redux.setMlPolynomialLearningRate(val);
  updateOptimizer = (val: string) => this.redux.setMlPolynomialOptimizer(val);

  resetTrained = () => this.redux.setMlPolynomialFactorsTrained(this.redux.state.ui.ai.mlPolynomial.factorsTrained.map(ii => 0));
  generatePoints = () => this.triggerDoPoints.next();

  async train(steps: number) {
    if (this.isBusy) {
      return;
    }
    this.isBusy = true;
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
      this.isBusy = false;
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
