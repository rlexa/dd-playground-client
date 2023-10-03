import {ComponentFixture} from '@angular/core/testing';
import {MockBuilder, MockRender} from 'ng-mocks';
import {IconPipe} from '../../pipe/icon';
import {NavigationBarComponent, NavigationBarItem} from './navigation-bar.component';

describe('NavigationBarComponent', () => {
  let fixture: ComponentFixture<NavigationBarComponent>;

  beforeEach(() => MockBuilder(NavigationBarComponent).mock(IconPipe, (val) => `icon ${val}`));

  beforeEach(() => {
    fixture = MockRender(NavigationBarComponent, undefined, false);
    fixture.componentInstance.layout = 'row';
    fixture.detectChanges();
  });

  it(`renders`, () => expect(fixture).toMatchSnapshot());

  describe(`with items`, () => {
    beforeEach(() => {
      fixture.componentInstance.items = [1, 2, 3].map<NavigationBarItem>((ii) => ({
        icon: `icon${ii}`,
        label: `label${ii}`,
        route: `route${ii}`,
      }));
      fixture.detectChanges();
    });

    it(`renders`, () => expect(fixture).toMatchSnapshot());

    describe(`with layout column`, () => {
      beforeEach(() => {
        fixture.componentInstance.layout = 'column';
        fixture.detectChanges();
      });

      it(`renders`, () => expect(fixture).toMatchSnapshot());
    });
  });
});
