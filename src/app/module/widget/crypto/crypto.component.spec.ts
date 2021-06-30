import {TestBed, waitForAsync} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormField} from '@angular/material/form-field';
import {MatList, MatListItem} from '@angular/material/list';
import {RouterTestingModule} from '@angular/router/testing';
import {MockComponents, MockDirectives} from 'ng-mocks';
import {detectChanges, mockAll, overrideForChangeDetection} from 'src/app/test';
import {FlexboxDirective} from '../../directive/flexbox';
import {CryptoApiService} from '../../service/crypto-api';
import {SimpleViewComponent} from '../simple-view';
import {CryptoComponent} from './crypto.component';

describe('CryptoComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, FormsModule],
        declarations: [
          CryptoComponent,
          MockComponents(MatButton, MatCard, MatCardTitle, MatCardContent, MatList, MatListItem, MatFormField),
          MockComponents(SimpleViewComponent),
          MockDirectives(FlexboxDirective),
        ],
        providers: [mockAll(CryptoApiService)],
      })
        .overrideComponent(CryptoComponent, overrideForChangeDetection)
        .compileComponents();
    }),
  );

  test('is created', () => {
    const fixture = TestBed.createComponent(CryptoComponent);
    detectChanges(fixture);
    expect(fixture).toMatchSnapshot();
  });
});
