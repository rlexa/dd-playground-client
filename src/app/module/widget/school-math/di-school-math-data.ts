import {inject, InjectionToken} from '@angular/core';
import {jsonEqual} from 'dd-rx-state';
import {StateSubject} from 'dd-rxjs';
import {TCreatedPdf} from 'pdfmake/build/pdfmake';
import {BehaviorSubject, Observable} from 'rxjs';
import {distinctUntilChanged, filter, map, shareReplay, startWith} from 'rxjs/operators';
import {generateMathTestGrade3, MathTest} from './math-test/math-test-generator';
import {mathTestToPdf} from './math-test/math-test-pdf';

/** Current math data seed. */
export const DiSchoolMathSeed = new InjectionToken<BehaviorSubject<number>>('DI math data seed.', {
  providedIn: 'root',
  factory: () => new StateSubject<number>(1),
});

/** Current math test data. */
export const DiSchoolMathTest = new InjectionToken<Observable<MathTest>>('DI math test data.', {
  providedIn: 'root',
  factory: () =>
    inject(DiSchoolMathSeed).pipe(
      filter((seed) => seed > 0),
      map((seed) => generateMathTestGrade3({seed, title: `Mathe Arbeit #${seed}`})),
      startWith<MathTest>(null as MathTest),
      distinctUntilChanged(jsonEqual),
      shareReplay({refCount: true, bufferSize: 1}),
    ),
});

/** Current math test pdf meta data. */
export const DiSchoolMathTestPdfMeta = new InjectionToken<Observable<TCreatedPdf>>('DI math test pdf meta data.', {
  providedIn: 'root',
  factory: () =>
    inject(DiSchoolMathTest).pipe(
      map((data) => mathTestToPdf(data)),
      shareReplay({refCount: true, bufferSize: 1}),
    ),
});
