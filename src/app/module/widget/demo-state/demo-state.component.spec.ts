import {async, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {provideRxState} from 'src/app/rx-state/test';
import {DemoStateComponent} from './demo-state.component';
import {imports} from './imports';

describe('DemoStateComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule, ...imports],
      declarations: [DemoStateComponent],
      providers: [...provideRxState],
    }).compileComponents();
  }));

  test('is created', () => {
    const fixture = TestBed.createComponent(DemoStateComponent);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
