import { Component } from '@angular/core';
import { arrayFrom } from 'app/util';

@Component({ selector: 'app-demo-misc', templateUrl: './demo-misc.component.html' })
export class DemoMiscComponent {

  curPolynomPoint = [0, 0];
  readonly samplePolynomPointsRange = 1000;
  samplePolynomPoints = [];

  constructor() {
    this.reSamplePolynomPoints();
  }

  reSamplePolynomPoints = () =>
    this.samplePolynomPoints = arrayFrom(10 * 2).map(ii => Math.random() * this.samplePolynomPointsRange - this.samplePolynomPointsRange / 2);
}
