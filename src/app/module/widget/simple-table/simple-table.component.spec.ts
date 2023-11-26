import {ComponentFixture} from '@angular/core/testing';
import {MockBuilder, MockRender} from 'ng-mocks';
import {firstValueFrom} from 'rxjs';
import {SimpleTableComponent} from './simple-table.component';

describe('SimpleTableComponent', () => {
  let fixture: ComponentFixture<SimpleTableComponent>;

  beforeEach(() => MockBuilder(SimpleTableComponent));

  beforeEach(() => {
    fixture = MockRender(SimpleTableComponent);
    fixture.detectChanges();
  });

  test('renders', () => expect(fixture).toMatchSnapshot());

  describe(`with data`, () => {
    beforeEach(() => {
      fixture.componentInstance.data = [
        {col0: 'row0', col1: 'row0'},
        {col0: 'row1', col1: 'row1'},
      ];
      fixture.detectChanges();
    });

    test(`renders`, () => expect(fixture).toMatchSnapshot());

    test(`has columns`, async () => expect(await firstValueFrom(fixture.componentInstance.columns$)).toEqual(['col0', 'col1']));

    test(`has no clickables`, async () => expect(await firstValueFrom(fixture.componentInstance.dataBatchClickables$)).toEqual([[], []]));
  });
});
