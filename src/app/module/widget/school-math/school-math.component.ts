import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DoneSubject, RxCleanup} from 'dd-rxjs';
import {TCreatedPdf} from 'pdfmake/build/pdfmake';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {filter, map, takeUntil, withLatestFrom} from 'rxjs/operators';
import {DiSchoolMathSeed, DiSchoolMathTest, DiSchoolMathTestPdfMeta} from './di-school-math-data';
import {MathTest} from './math-test/math-test-generator';

@Component({
  selector: 'app-school-math',
  templateUrl: './school-math.component.html',
  styleUrls: ['./school-math.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolMathComponent implements OnDestroy, OnInit {
  constructor(
    @Inject(DiSchoolMathSeed) public readonly seed$: BehaviorSubject<number>,
    @Inject(DiSchoolMathTest) public readonly data$: Observable<MathTest>,
    @Inject(DiSchoolMathTestPdfMeta) public readonly pdfMeta$: Observable<TCreatedPdf>,
  ) {}

  @RxCleanup() private readonly done$ = new DoneSubject();

  @RxCleanup() readonly triggerPdf$ = new Subject<void>();

  triggerPdf = () => this.triggerPdf$.next();
  setSeed = (seed: number) => this.seed$.next(seed);

  destroy() {}
  ngOnDestroy() {
    this.destroy();
  }

  ngOnInit() {
    this.triggerPdf$
      .pipe(
        withLatestFrom(this.pdfMeta$),
        map(([_, data]) => data),
        filter((ii) => !!ii),
        takeUntil(this.done$),
      )
      .subscribe((pdf) => pdf.open());
  }
}
