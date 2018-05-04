import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'app/rx';
import { arrayFrom } from 'app/util';

const createSamplePoints = (range = 100) => arrayFrom(10 * 2).map(ii => Math.random() * range - range / 2)

@Component({
  selector: 'app-demo-misc',
  templateUrl: './demo-misc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoMiscComponent {
  private readonly samplePolynomPointsRange = 100;
  readonly samplePolynomPoints$ = new BehaviorSubject(createSamplePoints(this.samplePolynomPointsRange));
  transitionalPolynomPoint = [0, 0];
  reSamplePolynomPoints = () => this.samplePolynomPoints$.next(createSamplePoints(this.samplePolynomPointsRange));
}
