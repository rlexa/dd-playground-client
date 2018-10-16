import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { Theme, themeColor_ } from 'app/game';
import { GameDownColorMap } from 'app/redux/game/down';
import { DoneSubject, rxComplete } from 'app/rx';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-game-down-field',
  templateUrl: './game-down-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDownFieldComponent implements OnDestroy {
  private readonly done$ = new DoneSubject();

  readonly theme$ = new BehaviorSubject(<Theme<GameDownColorMap>>null);

  readonly colorBg$ = this.theme$.pipe(map(themeColor_(ii => ii.fieldBackground)));

  @Input() set theme(val: Theme<GameDownColorMap>) { this.theme$.next(val); }

  ngOnDestroy() {
    this.done$.done();
    rxComplete(this.theme$);
  }
}
