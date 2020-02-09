import {async, TestBed} from '@angular/core/testing';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatList, MatListItem} from '@angular/material/list';
import {RouterTestingModule} from '@angular/router/testing';
import {MockComponents, MockDirectives} from 'ng-mocks';
import {mockAll, overrideForChangeDetection} from 'src/app/test';
import {FlexboxDirective} from '../../directive/flexbox';
import {GhibliApiService} from '../../service/ghibli-api';
import {LoadingBarComponent} from '../loading-bar';
import {SimpleTableComponent} from '../simple-table';
import {SimpleViewComponent} from '../simple-view';
import {GhibliComponent} from './ghibli.component';

describe('GhibliComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        GhibliComponent,
        MockComponents(MatCard, MatCardTitle, MatCardContent, MatButton, MatList, MatListItem),
        MockComponents(LoadingBarComponent, SimpleTableComponent, SimpleViewComponent),
        MockDirectives(FlexboxDirective),
      ],
      providers: [mockAll(GhibliApiService)],
    })
      .overrideComponent(GhibliComponent, overrideForChangeDetection)
      .compileComponents();
  }));

  test('is created', () => {
    const fixture = TestBed.createComponent(GhibliComponent);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
