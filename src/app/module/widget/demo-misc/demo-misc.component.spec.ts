import { async, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { DemoMiscComponent } from './demo-misc.component';
import { imports } from './imports';

describe('DemoMiscComponent', () => {
  beforeEach(async(() => {
    TestBed.configureCompiler(<any>{ preserveWhitespaces: false }).configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule, ...imports], declarations: [DemoMiscComponent], providers: [],
    }).compileComponents();
  }));

  test('is created', () => {
    const fixture = TestBed.createComponent(DemoMiscComponent);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
