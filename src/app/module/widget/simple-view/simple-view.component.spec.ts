import {ComponentFixture} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MockBuilder, MockRender} from 'ng-mocks';
import {IconPipe} from '../../pipe/icon';
import {SimpleViewComponent} from './simple-view.component';

describe('SimpleViewComponent', () => {
  let fixture: ComponentFixture<SimpleViewComponent<any>>;

  beforeEach(() =>
    MockBuilder(SimpleViewComponent)
      .keep(NoopAnimationsModule)
      .mock(IconPipe, (val) => `icon ${val}`),
  );

  beforeEach(() => {
    fixture = MockRender(SimpleViewComponent, undefined, false);
    fixture.componentInstance.isWidthConstrained = true;
    fixture.componentInstance.isExpanded = true;
    fixture.detectChanges();
  });

  test('renders', () => expect(fixture).toMatchSnapshot());

  describe(`with data`, () => {
    beforeEach(() => {
      fixture.componentInstance.data = {key: 'value'};
      fixture.detectChanges();
    });

    test(`renders`, () => expect(fixture).toMatchSnapshot());
  });
});
