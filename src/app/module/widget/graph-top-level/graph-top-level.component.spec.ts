import {HttpClient} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {MockBuilder, MockRender} from 'ng-mocks';
import {of} from 'rxjs';
import {mockAll} from 'src/app/test';
import {Mock} from 'ts-mockery';
import {GraphskyService} from '../../service/graphsky-api';
import {GraphTopLevelComponent} from './graph-top-level.component';

describe('GraphTopLevelComponent', () => {
  beforeEach(() =>
    MockBuilder(GraphTopLevelComponent)
      .provide(mockAll(GraphskyService))
      .provide(mockAll(HttpClient))
      .beforeCompileComponents((tb) => tb.overrideComponent(GraphTopLevelComponent, {set: {providers: [mockAll(GraphskyService)]}})),
  );

  beforeEach(() => {
    Mock.extend(TestBed.inject(HttpClient)).with({get: () => of(null)});
  });

  test('is created', () => {
    const fixture = MockRender(GraphTopLevelComponent);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
