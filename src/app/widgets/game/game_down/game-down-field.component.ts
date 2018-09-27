import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { GameDownStateField } from 'app/redux/game/down';
import { DoneSubject, rxComplete } from 'app/rx';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-game-down-field',
  templateUrl: './game-down-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDownFieldComponent implements OnDestroy {
  private readonly done$ = new DoneSubject();

  readonly data$ = new BehaviorSubject(<GameDownStateField>null);
  readonly hovered$ = new BehaviorSubject(false);
  readonly selected$ = new BehaviorSubject(false);
  readonly theme$ = new BehaviorSubject(<string>null);

  @Input() set data(val: GameDownStateField) { this.data$.next(val); }
  @Input() set hovered(val: boolean) { this.hovered$.next(!!val); }
  @Input() set selected(val: boolean) { this.selected$.next(!!val); }
  @Input() set theme(val: string) { this.theme$.next(val); }

  @Input() viewDebug = false;

  ngOnDestroy() {
    this.done$.done();
    rxComplete(this.data$, this.hovered$, this.selected$, this.theme$);
  }
}
