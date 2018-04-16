import { Component, OnDestroy } from '@angular/core';
import { detectPolynom, generatePolynomialPoints } from 'app/ai';
import { ReduxService } from 'app/redux';
import { DoneSubject } from 'app/rx';
import { trackByIndex } from 'app/widgets/util';

@Component({
  selector: 'app-ml-polynomial',
  templateUrl: './ml-polynomial.component.html'
})
export class MlPolynomialComponent implements OnDestroy {

  private readonly numPoints = 10;
  private readonly xRange = 100;
  private readonly factorRange = 10;
  private readonly learningRate = .1;
  private readonly done = new DoneSubject();

  readonly colors = ['rgba(0, 0, 255, 200)', 'rgba(255, 100, 100, 255)'];
  readonly trackByIndex = trackByIndex;

  isBusy = false;

  constructor(private readonly redux: ReduxService) { }

  factorsCurrent$ = this.redux.watch(state => state.ui.ai.mlPolynomial.factorsCurrent).takeUntil(this.done)
    .do(() => this.generatePoints());
  factorsTrained$ = this.redux.watch(state => state.ui.ai.mlPolynomial.factorsTrained).takeUntil(this.done);
  pointsCurrent$ = this.redux.watch(state => state.ui.ai.mlPolynomial.pointsCurrent).takeUntil(this.done);

  ngOnDestroy() { this.done.done(); }

  updateFactor(factors: number[], index: number, val: number) {
    factors = [...factors];
    factors[index] = Math.min(Math.max(val || 0, -this.factorRange), this.factorRange);
    this.redux.setMlPolynomialFactorsCurrent(factors);
  }

  generatePoints = () =>
    this.redux.setMlPolynomialPointsCurrent(
      generatePolynomialPoints({
        weights: this.redux.state.ui.ai.mlPolynomial.factorsCurrent,
        points: this.numPoints,
        xFrom: -this.xRange / 2,
        xTo: this.xRange / 2
      }));

  async train(steps: number) {
    if (this.isBusy) {
      return;
    }
    this.isBusy = true;
    try {
      const state = this.redux.state.ui.ai.mlPolynomial;
      const trained = await detectPolynom({ initialWeights: state.factorsTrained, learningRate: this.learningRate, loops: steps, xyFlatData: state.pointsCurrent });
      this.redux.setMlPolynomialFactorsTrained(trained);
    } finally {
      this.isBusy = false;
    }
  }
}
