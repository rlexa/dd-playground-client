import { async, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideRxState } from 'app/rx-state/test';
import { DashboardComponent } from './dashboard.component';
import { imports } from './imports';

describe('DashboardComponent', () => {
  beforeEach(async(() => {
    TestBed.configureCompiler(<any>{ preserveWhitespaces: false }).configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule, ...imports], declarations: [DashboardComponent], providers: [...provideRxState],
    }).compileComponents();
  }));

  test('is created', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
