import {async, TestBed} from '@angular/core/testing';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {RouterTestingModule} from '@angular/router/testing';
import {MockComponents, MockDirectives} from 'ng-mocks';
import {provideRxState} from 'src/app/rx-state/test';
import {detectChanges, overrideForChangeDetection} from 'src/app/test';
import {FlexboxDirective} from '../../directive/flexbox';
import {SimpleViewComponent} from '../simple-view';
import {DemoStateComponent} from './demo-state.component';

describe('DemoStateComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        DemoStateComponent,
        MockComponents(MatCard, MatCardTitle, MatCardContent, SimpleViewComponent),
        MockDirectives(FlexboxDirective),
      ],
      providers: [provideRxState],
    })
      .overrideComponent(DemoStateComponent, overrideForChangeDetection)
      .compileComponents();
  }));

  test('is created', () => {
    const fixture = TestBed.createComponent(DemoStateComponent);
    detectChanges(fixture);
    expect(fixture).toMatchSnapshot();
  });
});
