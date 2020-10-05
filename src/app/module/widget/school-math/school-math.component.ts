import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {RxCleanup} from 'dd-rxjs';
import {Subject} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {generateMathTestGrade2, MathTest} from './math-test/math-test-generator';

@Component({
  selector: 'app-school-math',
  templateUrl: './school-math.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolMathComponent implements OnDestroy, OnInit {
  @RxCleanup() triggerGenerate$ = new Subject();

  data$ = this.triggerGenerate$.pipe(
    map(() => generateMathTestGrade2({seed: this.seed, title: 'Mathe Arbeit'})),
    startWith<MathTest>(null as MathTest),
  );

  seed = 1;

  triggerGenerate = () => this.triggerGenerate$.next();

  destroy() {}
  ngOnDestroy() {
    this.destroy();
  }

  ngOnInit() {}
}
