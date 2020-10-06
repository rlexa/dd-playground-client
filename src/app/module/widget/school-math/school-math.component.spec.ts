import {TestBed} from '@angular/core/testing';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MockComponents} from 'ng-mocks';
import {detectChanges, overrideForChangeDetection} from 'src/app/test';
import {SimpleViewComponent} from '../simple-view';
import {SchoolMathComponent} from './school-math.component';

describe('SchoolMathComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [SchoolMathComponent, MockComponents(MatButton, MatCard, MatCardTitle, MatCardContent, SimpleViewComponent)],
      providers: [],
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
