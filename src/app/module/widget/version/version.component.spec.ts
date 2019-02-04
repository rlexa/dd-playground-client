import { async, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideRxState } from 'app/rx-state/test';
import { imports } from './imports';
import { VersionComponent } from './version.component';

describe('VersionComponent', () => {
  beforeEach(async(() => {
    TestBed.configureCompiler(<any>{ preserveWhitespaces: false }).configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule, ...imports], declarations: [VersionComponent], providers: [...provideRxState],
    }).compileComponents();
  }));

  test('is created', () => {
    const fixture = TestBed.createComponent(VersionComponent);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
