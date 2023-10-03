import {ComponentFixture} from '@angular/core/testing';
import {MockBuilder, MockRender} from 'ng-mocks';
import {OverviewComponent} from './overview.component';

describe('OverviewComponent', () => {
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(() => MockBuilder(OverviewComponent));

  beforeEach(() => {
    fixture = MockRender(OverviewComponent);
    fixture.detectChanges();
  });

  test('renders', () => expect(fixture).toMatchSnapshot());
});
