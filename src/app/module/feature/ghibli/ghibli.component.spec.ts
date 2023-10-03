import {ComponentFixture} from '@angular/core/testing';
import {MockBuilder, MockRender} from 'ng-mocks';
import {mockAll} from 'src/app/test';
import {GhibliApiService} from '../../service/ghibli-api';
import {GhibliComponent} from './ghibli.component';

describe('GhibliComponent', () => {
  let fixture: ComponentFixture<GhibliComponent>;

  beforeEach(() => MockBuilder(GhibliComponent).provide(mockAll(GhibliApiService)));

  beforeEach(() => {
    fixture = MockRender(GhibliComponent);
    fixture.detectChanges();
  });

  test('renders', () => expect(fixture).toMatchSnapshot());
});
