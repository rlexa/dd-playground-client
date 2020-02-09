import {ChangeDetectionStrategy, Component, Input, OnDestroy} from '@angular/core';
import {fTthemeColor, Theme} from 'src/app/game';
import {GameDownColorMap} from 'src/app/module/widget/game-down/data';
import {RxCleanup} from 'dd-rxjs';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-game-down-field',
  templateUrl: './game-down-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDownFieldComponent implements OnDestroy {
  @RxCleanup() readonly theme$ = new BehaviorSubject<Theme<GameDownColorMap>>(null);

  readonly colorBg$ = this.theme$.pipe(map(fTthemeColor(ii => ii.fieldBackground)));

  @Input() set theme(val: Theme<GameDownColorMap>) {
    this.theme$.next(val);
  }

  ngOnDestroy() {}
}
