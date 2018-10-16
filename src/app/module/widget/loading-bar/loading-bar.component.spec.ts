import { async, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { imports } from './imports';
import { LoadingBarComponent } from './loading-bar.component';

describe('LoadingBarComponent', () => {
  beforeEach(async(() => {
    TestBed.configureCompiler(<any>{ preserveWhitespaces: false }).configureTestingModule({
      imports: [NoopAnimationsModule, ...imports], declarations: [LoadingBarComponent], providers: [],
    }).compileComponents();
  }));

  test('is created', () => {
    const fixture = TestBed.createComponent(LoadingBarComponent);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
