import {async, TestBed} from '@angular/core/testing';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatList} from '@angular/material/list';
import {RouterTestingModule} from '@angular/router/testing';
import {MockComponents, MockDirectives} from 'ng-mocks';
import {detectChanges, overrideForChangeDetection} from 'src/app/test';
import {FlexboxDirective} from '../../directive/flexbox';
import {OverviewComponent} from './overview.component';

describe('OverviewComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [OverviewComponent, MockComponents(MatCard, MatCardTitle, MatCardContent, MatList), MockDirectives(FlexboxDirective)],
      providers: [],
    })
      .overrideComponent(OverviewComponent, overrideForChangeDetection)
      .compileComponents();
  }));

  test('is created', () => {
    const fixture = TestBed.createComponent(OverviewComponent);
    detectChanges(fixture);
    expect(fixture).toMatchSnapshot();
  });
});
