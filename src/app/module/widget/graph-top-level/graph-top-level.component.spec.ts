import {HttpClient} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MockComponents} from 'ng-mocks';
import {of} from 'rxjs';
import {detectChanges, mockAll, overrideForChangeDetection} from 'src/app/test';
import {Mock} from 'ts-mockery';
import {GraphskyService} from '../../service/graphsky-api';
import {NavigationContentComponent} from '../navigation-content';
import {GraphTopLevelComponent} from './graph-top-level.component';

describe('GraphTopLevelComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [GraphTopLevelComponent, MockComponents(NavigationContentComponent)],
      providers: [mockAll(GraphskyService), mockAll(HttpClient)],
    })
      .overrideComponent(GraphTopLevelComponent, overrideForChangeDetection)
      .compileComponents();
  });

  beforeEach(() => {
    Mock.extend(TestBed.inject(HttpClient)).with({get: () => of(null)});
  });

  test('is created', () => {
    const fixture = TestBed.createComponent(GraphTopLevelComponent);
    detectChanges(fixture);
    expect(fixture).toMatchSnapshot();
  });
});
