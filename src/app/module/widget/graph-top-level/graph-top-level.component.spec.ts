import { async, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { GraphTopLevelComponent } from './graph-top-level.component';
import { imports } from './imports';

describe('GraphTopLevelComponent', () => {
  beforeEach(async(() => {
    TestBed.configureCompiler(<any>{ preserveWhitespaces: false }).configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule, ...imports], declarations: [GraphTopLevelComponent], providers: [],
    }).compileComponents();
  }));

  test('is created', () => {
    const fixture = TestBed.createComponent(GraphTopLevelComponent);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
