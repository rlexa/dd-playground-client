import {HttpClient} from '@angular/common/http';
import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MockComponents} from 'ng-mocks';
import {of} from 'rxjs';
import {detectChanges, getByType, mockAll, overrideForChangeDetection} from 'src/app/test';
import {Mock} from 'ts-mockery';
import {GraphskyService} from '../../service/graphsky-api';
import {RoutedContentComponent} from '../routed-content';
import {GraphTopLevelComponent} from './graph-top-level.component';

describe('GraphTopLevelComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [GraphTopLevelComponent, MockComponents(RoutedContentComponent)],
      providers: [mockAll(GraphskyService), mockAll(HttpClient)],
    })
      .overrideComponent(GraphTopLevelComponent, overrideForChangeDetection)
      .compileComponents();
  }));

  beforeEach(() => {
    Mock.extend(getByType(HttpClient)).with({get: () => of(null)});
  });

  test('is created', () => {
    const fixture = TestBed.createComponent(GraphTopLevelComponent);
    detectChanges(fixture);
    expect(fixture).toMatchSnapshot();
  });
});
