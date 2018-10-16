import { async, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DiagramPolynomComponent } from './diagram-polynom.component';
import { imports } from './imports';

describe('DiagramPolynomComponent', () => {
  beforeEach(async(() => {
    TestBed.configureCompiler(<any>{ preserveWhitespaces: false }).configureTestingModule({
      imports: [NoopAnimationsModule, ...imports], declarations: [DiagramPolynomComponent], providers: [],
    }).compileComponents();
  }));

  test('is created', () => {
    const fixture = TestBed.createComponent(DiagramPolynomComponent);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
