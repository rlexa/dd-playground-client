import {async, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {provideRxState} from 'app/rx-state/test';
import {BuildComponent} from './build.component';
import {imports} from './imports';

describe('BuildComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule, ...imports],
      declarations: [BuildComponent],
      providers: [...provideRxState],
    }).compileComponents();
  }));

  test('is created', () => {
    const fixture = TestBed.createComponent(BuildComponent);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
