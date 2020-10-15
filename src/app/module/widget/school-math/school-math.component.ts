import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {DoneSubject, RxCleanup} from 'dd-rxjs';
import {Subject} from 'rxjs';
import {filter, map, shareReplay, startWith, takeUntil, withLatestFrom} from 'rxjs/operators';
import {generateMathTestGrade2, MathTest} from './math-test/math-test-generator';
import {mathTestToPdf, mathTestToPoints} from './math-test/math-test-pdf';

@Component({
  selector: 'app-school-math',
  templateUrl: './school-math.component.html',
  styleUrls: ['./school-math.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolMathComponent implements OnDestroy, OnInit {
  @RxCleanup() private readonly done$ = new DoneSubject();

  @RxCleanup() readonly triggerGenerate$ = new Subject();
  @RxCleanup() readonly triggerPdf$ = new Subject();

  readonly data$ = this.triggerGenerate$.pipe(
    map(() => this.seed),
    filter((seed) => seed > 0),
    map((seed) => generateMathTestGrade2({seed, title: `Mathe Arbeit #${this.seed}`})),
    startWith<MathTest>(null as MathTest),
    shareReplay({refCount: true, bufferSize: 1}),
    takeUntil(this.done$),
  );

  readonly pdfMeta$ = this.data$.pipe(
    map((data) => mathTestToPdf(data)),
    shareReplay({refCount: true, bufferSize: 1}),
    takeUntil(this.done$),
  );

  readonly points$ = this.data$.pipe(map(mathTestToPoints));

  seed = 1;

  triggerGenerate = () => this.triggerGenerate$.next();
  triggerPdf = () => this.triggerPdf$.next();

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
