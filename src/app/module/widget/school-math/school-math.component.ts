import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {of} from 'rxjs';

@Component({
  selector: 'app-school-math',
  templateUrl: './school-math.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolMathComponent implements OnDestroy, OnInit {
  data$ = of({title: 'Mathe Arbeit'});

  destroy() {}
  ngOnDestroy() {
    this.destroy();
  }

  ngOnInit() {}
}
