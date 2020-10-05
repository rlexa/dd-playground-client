import {TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {RouterTestingModule} from '@angular/router/testing';
import {MockComponents, MockDirectives} from 'ng-mocks';
import {detectChanges, mockAll, overrideForChangeDetection} from 'src/app/test';
import {FlexboxDirective} from '../../directive/flexbox';
import {CryptoApiService} from '../../service/crypto-api';
import {SimpleViewComponent} from '../simple-view';
import {SchoolMathComponent} from './school-math.component';

describe('SchoolMathComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [
        SchoolMathComponent,
        MockComponents(MatButton, MatCard, MatCardTitle, MatCardContent, SimpleViewComponent),
        MockDirectives(FlexboxDirective),
      ],
      providers: [mockAll(CryptoApiService)],
    })
      .overrideComponent(SchoolMathComponent, overrideForChangeDetection)
      .compileComponents();
  });

  test('is created', () => {
    const fixture = TestBed.createComponent(SchoolMathComponent);
    detectChanges(fixture);
    expect(fixture).toMatchSnapshot();
  });
});
