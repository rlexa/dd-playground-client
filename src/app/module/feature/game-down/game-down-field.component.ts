import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input, OnDestroy} from '@angular/core';
import {RxCleanup} from 'dd-rxjs';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {GameDownColorMap} from './data';
import {Theme, fTthemeColor} from './theme';

@Component({
  selector: 'app-game-down-field',
  template: `<div
    class="position-relative deadclick-force"
    [ngStyle]="{width: '9em', height: '9em'}"
    [style.backgroundColor]="colorBg$ | async"
  >
    <ng-content />
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class GameDownFieldComponent implements OnDestroy {
  @RxCleanup() readonly theme$ = new BehaviorSubject<Theme<GameDownColorMap>>(null);

  readonly colorBg$ = this.theme$.pipe(map(fTthemeColor((ii) => ii.fieldBackground)));

  @Input() set theme(val: Theme<GameDownColorMap>) {
    this.theme$.next(val);
  }

  destroy() {}
  ngOnDestroy() {
    this.destroy();
  }
}
