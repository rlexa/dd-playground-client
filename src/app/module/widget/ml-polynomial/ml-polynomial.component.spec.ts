import { async, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideRxState } from 'app/rx-state/test';
import { imports } from './imports';
import { MlPolynomialComponent } from './ml-polynomial.component';

describe('MlPolynomialComponent', () => {
  beforeEach(async(() => {
    TestBed.configureCompiler(<any>{ preserveWhitespaces: false }).configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule, ...imports], declarations: [MlPolynomialComponent], providers: [...provideRxState],
    }).compileComponents();
  }));

  test('is created', () => {
    const fixture = TestBed.createComponent(MlPolynomialComponent);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
