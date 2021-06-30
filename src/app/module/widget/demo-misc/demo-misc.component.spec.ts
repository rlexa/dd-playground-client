import {TestBed, waitForAsync} from '@angular/core/testing';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {RouterTestingModule} from '@angular/router/testing';
import {MockComponents, MockDirectives} from 'ng-mocks';
import {detectChanges, overrideForChangeDetection} from 'src/app/test';
import {FlexboxDirective} from '../../directive/flexbox';
import {SimpleViewComponent} from '../simple-view';
import {DemoMiscComponent} from './demo-misc.component';

describe('DemoMiscComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [
          DemoMiscComponent,
          MockComponents(MatButton, MatCard, MatCardTitle, MatCardContent),
          MockComponents(SimpleViewComponent),
          MockDirectives(FlexboxDirective),
        ],
        providers: [],
      })
        .overrideComponent(DemoMiscComponent, overrideForChangeDetection)
        .compileComponents();
    }),
  );

  test('is created', () => {
    const fixture = TestBed.createComponent(DemoMiscComponent);
    detectChanges(fixture);
    expect(fixture).toMatchSnapshot();
  });
});
