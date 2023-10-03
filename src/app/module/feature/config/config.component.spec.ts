import {ComponentFixture} from '@angular/core/testing';
import {MockBuilder, MockRender} from 'ng-mocks';
import {ConfigComponent} from './config.component';

describe('ConfigComponent', () => {
  let fixture: ComponentFixture<ConfigComponent>;

  beforeEach(() => MockBuilder(ConfigComponent));

  beforeEach(() => {
    fixture = MockRender(ConfigComponent);
    fixture.detectChanges();
  });

  test('renders', () => expect(fixture).toMatchSnapshot());
});
