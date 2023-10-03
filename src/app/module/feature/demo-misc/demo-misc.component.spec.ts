import {ComponentFixture} from '@angular/core/testing';
import {MockBuilder, MockRender} from 'ng-mocks';
import {GraphskyService} from '../../service/graphsky-api';
import {DemoMiscComponent} from './demo-misc.component';

describe('DemoMiscComponent', () => {
  let fixture: ComponentFixture<DemoMiscComponent>;

  beforeEach(() =>
    MockBuilder(DemoMiscComponent).beforeCompileComponents((tb) =>
      tb.overrideComponent(DemoMiscComponent, {set: {providers: [GraphskyService]}}),
    ),
  );

  beforeEach(() => {
    fixture = MockRender(DemoMiscComponent);
    fixture.detectChanges();
  });

  test('renders', () => expect(fixture).toMatchSnapshot());
});
