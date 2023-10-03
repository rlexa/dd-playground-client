import {MockBuilder, MockRender, MockedComponentFixture} from 'ng-mocks';
import {TCreatedPdf} from 'pdfmake/build/pdfmake';
import {BehaviorSubject, of} from 'rxjs';
import {DiSchoolMathSeed, DiSchoolMathTest, DiSchoolMathTestPdfMeta} from './di-school-math-data';
import {MathTest} from './math-test/math-test-generator';
import {SchoolMathComponent} from './school-math.component';

describe('SchoolMathComponent', () => {
  let fixture: MockedComponentFixture<SchoolMathComponent>;

  const seed$ = new BehaviorSubject<number>(null);

  afterAll(() => seed$.complete());

  beforeEach(() =>
    MockBuilder(SchoolMathComponent)
      .provide({provide: DiSchoolMathSeed, useValue: seed$})
      .provide({provide: DiSchoolMathTest, useValue: of<MathTest>({title: 'title', tasks: []})})
      .provide({provide: DiSchoolMathTestPdfMeta, useValue: of<TCreatedPdf>({} as TCreatedPdf)}),
  );

  beforeEach(() => {
    seed$.next(123);
    fixture = MockRender(SchoolMathComponent);
    fixture.detectChanges();
  });

  test('renders', () => expect(fixture).toMatchSnapshot());
});
