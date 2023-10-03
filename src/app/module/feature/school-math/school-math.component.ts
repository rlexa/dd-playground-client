import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {DoneSubject, RxCleanup} from 'dd-rxjs';
import {Subject} from 'rxjs';
import {filter, map, takeUntil, withLatestFrom} from 'rxjs/operators';
import {SimpleViewComponent} from '../../widget/simple-view';
import {DiSchoolMathSeed, DiSchoolMathTest, DiSchoolMathTestPdfMeta} from './di-school-math-data';

@Component({
  selector: 'app-school-math',
  template: `<mat-card appearance="outlined">
    <mat-card-title>Math Test</mat-card-title>
    <mat-card-content>
      <p>
        <mat-form-field>
          <input #input type="number" matInput [min]="1" placeholder="Seed" [value]="seed$ | async" (change)="setSeed(+input.value)" />
        </mat-form-field>
        <button mat-raised-button [disabled]="!!!(data$ | async)" (click)="triggerPdf()">PDF</button>
      </p>
      <app-simple-view subheader="JSON" [data]="data$ | async" [isWidthConstrained]="false" [isDense]="true" />
      <app-simple-view subheader="PDF" [data]="pdfMeta$ | async" [isWidthConstrained]="false" [isDense]="true" />
    </mat-card-content>
  </mat-card>`,
  styleUrls: ['./school-math.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, SimpleViewComponent],
})
export class SchoolMathComponent implements OnDestroy, OnInit {
  readonly data$ = inject(DiSchoolMathTest);
  readonly pdfMeta$ = inject(DiSchoolMathTestPdfMeta);
  readonly seed$ = inject(DiSchoolMathSeed);

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
