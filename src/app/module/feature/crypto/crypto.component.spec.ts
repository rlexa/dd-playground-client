import {ComponentFixture} from '@angular/core/testing';
import {MockBuilder, MockRender} from 'ng-mocks';
import {mockAll} from 'src/app/test';
import {CryptoApiService} from '../../service/crypto-api';
import {CryptoComponent} from './crypto.component';

describe('CryptoComponent', () => {
  let fixture: ComponentFixture<CryptoComponent>;

  beforeEach(() => MockBuilder(CryptoComponent).provide(mockAll(CryptoApiService)));

  beforeEach(() => {
    fixture = MockRender(CryptoComponent);
    fixture.detectChanges();
  });

  test('renders', () => expect(fixture).toMatchSnapshot());
});
