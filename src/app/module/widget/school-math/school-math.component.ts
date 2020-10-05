import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {DoneSubject, RxCleanup} from 'dd-rxjs';
import {Subject} from 'rxjs';
import {filter, map, shareReplay, startWith, takeUntil, withLatestFrom} from 'rxjs/operators';
import {generateMathTestGrade2, MathTest} from './math-test/math-test-generator';
import {mathTestToPdf} from './math-test/math-test-pdf';

@Component({
  selector: 'app-school-math',
  templateUrl: './school-math.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolMathComponent implements OnDestroy, OnInit {
  @RxCleanup() private readonly done$ = new DoneSubject();

  @RxCleanup() readonly triggerGenerate$ = new Subject();
  @RxCleanup() readonly triggerPdf$ = new Subject();

  readonly data$ = this.triggerGenerate$.pipe(
    map(() => generateMathTestGrade2({seed: this.seed, title: 'Mathe Arbeit'})),
    startWith<MathTest>(null as MathTest),
    shareReplay({refCount: true, bufferSize: 1}),
    takeUntil(this.done$),
  );

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
        withLatestFrom(this.data$),
        map(([_, data]) => data),
        filter((ii) => !!ii),
        map((data) => mathTestToPdf(data)),
        filter((ii) => !!ii),
        takeUntil(this.done$),
      )
      .subscribe((pdf) => pdf.open());
  }
}
