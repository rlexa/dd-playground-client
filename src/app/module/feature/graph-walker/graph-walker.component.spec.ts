import {ComponentFixture} from '@angular/core/testing';
import {MockBuilder, MockRender} from 'ng-mocks';
import {GraphskyService} from 'src/app/module/service/graphsky-api';
import {IconPipe} from '../../pipe/icon';
import {GraphWalkerComponent} from './graph-walker.component';

describe('GraphWalkerComponent', () => {
  let fixture: ComponentFixture<GraphWalkerComponent>;

  beforeEach(() =>
    MockBuilder(GraphWalkerComponent)
      .mock(IconPipe, (val) => `icon ${val}`)
      .provide(GraphskyService),
  );

  beforeEach(() => {
    fixture = MockRender(GraphWalkerComponent);
    fixture.detectChanges();
  });

  test('renders', () => expect(fixture).toMatchSnapshot());
});
