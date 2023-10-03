import {ComponentFixture} from '@angular/core/testing';
import {MockBuilder, MockRender} from 'ng-mocks';
import {LoadingBarComponent} from './loading-bar.component';

describe('LoadingBarComponent', () => {
  let fixture: ComponentFixture<LoadingBarComponent>;

  beforeEach(() => MockBuilder(LoadingBarComponent));

  beforeEach(() => {
    fixture = MockRender(LoadingBarComponent);
    fixture.detectChanges();
  });

  test('renders', () => expect(fixture).toMatchSnapshot());

  describe(`with show`, () => {
    beforeEach(() => {
      fixture.componentInstance.show = true;
      fixture.detectChanges();
    });

    test('renders', () => expect(fixture).toMatchSnapshot());

    describe(`with margin`, () => {
      beforeEach(() => {
        fixture.componentInstance.withMargin = true;
        fixture.detectChanges();
      });

      test('renders', () => expect(fixture).toMatchSnapshot());
    });
  });
});
