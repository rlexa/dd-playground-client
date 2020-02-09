import {async, TestBed} from '@angular/core/testing';
import {MatButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {MatTooltip} from '@angular/material/tooltip';
import {RouterTestingModule} from '@angular/router/testing';
import {MockComponents, MockDirectives, MockPipe} from 'ng-mocks';
import {provideRxState} from 'src/app/rx-state/test';
import {detectChanges, overrideForChangeDetection} from 'src/app/test';
import {FlexboxDirective} from '../../directive/flexbox';
import {IconPipe} from '../../pipe/icon';
import {VersionComponent} from '../version';
import {DashboardComponent} from './dashboard.component';

describe('DashboardComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        DashboardComponent,
        MockComponents(MatButton, MatToolbar),
        MockDirectives(MatTooltip, FlexboxDirective),
        MockComponents(VersionComponent),
        MockPipe(IconPipe, val => `icon ${val}`),
      ],
      providers: [provideRxState],
    })
      .overrideComponent(DashboardComponent, overrideForChangeDetection)
      .compileComponents();
  }));

  test('is created', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    detectChanges(fixture);
    expect(fixture).toMatchSnapshot();
  });
});
