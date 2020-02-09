import {async, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {GraphskyService} from 'src/app/module/service/graphsky-api';
import {GraphWalkerComponent} from './graph-walker.component';
import {imports} from './imports';

describe('GraphWalkerComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule, ...imports],
      declarations: [GraphWalkerComponent],
      providers: [GraphskyService],
    }).compileComponents();
  }));

  test('is created', () => {
    const fixture = TestBed.createComponent(GraphWalkerComponent);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
