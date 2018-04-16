import { Component, ChangeDetectorRef } from '@angular/core';
import { trackByIndex } from 'app/widgets/util';
import { times, generatePolynomialPoints, detectPolynom } from 'app/ai';

@Component({
  selector: 'app-ml-polynomial',
  templateUrl: './ml-polynomial.component.html'
})
export class MlPolynomialComponent {

  private readonly numPoints = 10;
  private readonly xRange = 100;
  private readonly factorRange = 10;
  private readonly learningRate = .1;

  readonly colors = ['rgba(0, 0, 255, 200)', 'rgba(255, 100, 100, 255)'];
  readonly trackByIndex = trackByIndex;

  pointsCurrent = <number[]>[];
  factorsCurrent = [1, 1, 1, 1];
  factorsTrained = [0, 0, 0, 0];
  isBusy = false;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {
    this.generatePoints();
  }

  getFactor = (index: number) => this.factorsCurrent[index];
  setFactor(index: number, val: number) {
    this.factorsCurrent[index] = Math.min(Math.max(val || 0, -this.factorRange), this.factorRange);
    this.factorsCurrent = [...this.factorsCurrent];
    this.generatePoints();
    this.changeDetectorRef.markForCheck();
  }

  async train(steps: number) {
    if (this.isBusy) {
      return;
    }
    this.isBusy = true;
    let factorsTrained = [...this.factorsTrained];
    try {
      factorsTrained = await detectPolynom({ initialWeights: this.factorsTrained, learningRate: this.learningRate, loops: steps, xyFlatData: this.pointsCurrent });
    } finally {
      this.isBusy = false;
      this.factorsTrained = factorsTrained;
      this.changeDetectorRef.markForCheck();
    }
  }

  private generatePoints = () =>
    this.pointsCurrent = generatePolynomialPoints({ weights: this.factorsCurrent, points: this.numPoints, xFrom: -this.xRange / 2, xTo: this.xRange / 2 });
}
