import { async, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideRedux } from 'app/redux/test';
import { BuildComponent } from './build.component';
import { imports } from './imports';

describe('BuildComponent', () => {
  beforeEach(async(() => {
    TestBed.configureCompiler(<any>{ preserveWhitespaces: false }).configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule, ...imports], declarations: [BuildComponent], providers: [...provideRedux],
    }).compileComponents();
  }));

  test('is created', () => {
    const fixture = TestBed.createComponent(BuildComponent);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
