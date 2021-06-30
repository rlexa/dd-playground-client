import {TestBed, waitForAsync} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {MatAutocomplete, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatOption} from '@angular/material/core';
import {MatFormField} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatSelect} from '@angular/material/select';
import {RouterTestingModule} from '@angular/router/testing';
import {MockComponents, MockDirectives, MockPipe} from 'ng-mocks';
import {GraphskyService} from 'src/app/module/service/graphsky-api';
import {detectChanges, overrideForChangeDetection} from 'src/app/test';
import {FlexboxDirective} from '../../directive/flexbox';
import {IconPipe} from '../../pipe/icon';
import {SimpleViewComponent} from '../simple-view';
import {GraphWalkerComponent} from './graph-walker.component';

describe('GraphWalkerComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, FormsModule],
        declarations: [
          GraphWalkerComponent,
          MockComponents(MatAutocomplete, MatButton, MatCard, MatCardContent, MatFormField, MatIcon, MatOption, MatSelect),
          MockComponents(SimpleViewComponent),
          MockDirectives(MatAutocompleteTrigger, FlexboxDirective),
          MockPipe(IconPipe, (val) => `icon ${val}`),
        ],
        providers: [GraphskyService],
      })
        .overrideComponent(GraphWalkerComponent, overrideForChangeDetection)
        .compileComponents();
    }),
  );

  test('is created', () => {
    const fixture = TestBed.createComponent(GraphWalkerComponent);
    detectChanges(fixture);
    expect(fixture).toMatchSnapshot();
  });
});
