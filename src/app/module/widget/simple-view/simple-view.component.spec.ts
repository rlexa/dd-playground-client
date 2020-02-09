import {async, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {imports} from './imports';
import {SimpleViewComponent} from './simple-view.component';

describe('SimpleViewComponent', () => {
  beforeEach(async(() => {
    TestBed.configureCompiler({preserveWhitespaces: false} as any)
      .configureTestingModule({
        imports: [NoopAnimationsModule, ...imports],
        declarations: [SimpleViewComponent],
        providers: [],
      })
      .compileComponents();
  }));

  test('is created', () => {
    const fixture = TestBed.createComponent(SimpleViewComponent);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
