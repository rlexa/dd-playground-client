import {async, TestBed} from '@angular/core/testing';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {RouterTestingModule} from '@angular/router/testing';
import {MockComponents} from 'ng-mocks';
import {provideRxState} from 'src/app/rx-state/test';
import {detectChanges, overrideForChangeDetection} from 'src/app/test';
import {SimpleViewComponent} from '../simple-view';
import {BuildComponent} from './build.component';

describe('BuildComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [BuildComponent, MockComponents(MatCard, MatCardTitle, MatCardContent, SimpleViewComponent)],
      providers: [provideRxState],
    })
      .overrideComponent(BuildComponent, overrideForChangeDetection)
      .compileComponents();
  }));

  test('is created', () => {
    const fixture = TestBed.createComponent(BuildComponent);
    detectChanges(fixture);
    expect(fixture).toMatchSnapshot();
  });
});
