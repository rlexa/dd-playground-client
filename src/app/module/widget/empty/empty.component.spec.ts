import {ComponentFixture} from '@angular/core/testing';
import {MockBuilder, MockRender} from 'ng-mocks';
import {EmptyComponent} from './empty.component';

describe('BuildComponent', () => {
  let fixture: ComponentFixture<EmptyComponent>;

  beforeEach(() => MockBuilder(EmptyComponent));

  beforeEach(() => {
    fixture = MockRender(EmptyComponent);
    fixture.detectChanges();
  });

  test('renders', () => expect(fixture).toMatchSnapshot());
});
