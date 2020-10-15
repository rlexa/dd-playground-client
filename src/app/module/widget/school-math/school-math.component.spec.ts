import {TestBed} from '@angular/core/testing';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormField} from '@angular/material/form-field';
import {MockComponents} from 'ng-mocks';
import {TCreatedPdf} from 'pdfmake/build/pdfmake';
import {BehaviorSubject, of} from 'rxjs';
import {detectChanges, overrideForChangeDetection} from 'src/app/test';
import {SimpleViewComponent} from '../simple-view';
import {DiSchoolMathSeed, DiSchoolMathTest, DiSchoolMathTestPdfMeta} from './di-school-math-data';
import {MathTest} from './math-test/math-test-generator';
import {SchoolMathComponent} from './school-math.component';

describe('SchoolMathComponent', () => {
  const seed$ = new BehaviorSubject<number>(null);

  afterAll(() => seed$.complete());

  beforeEach(() => seed$.next(123));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        SchoolMathComponent,
        MockComponents(MatButton, MatCard, MatCardTitle, MatCardContent, MatFormField, SimpleViewComponent),
      ],
      providers: [
        {provide: DiSchoolMathSeed, useValue: seed$},
        {provide: DiSchoolMathTest, useValue: of<MathTest>({title: 'title', tasks: []})},
        {provide: DiSchoolMathTestPdfMeta, useValue: of<TCreatedPdf>({} as TCreatedPdf)},
      ],
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
