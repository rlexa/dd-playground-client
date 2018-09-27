import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ReduxService } from 'app/redux';
import { DoneSubject } from 'app/rx';

@Component({
  selector: 'app-game-down',
  templateUrl: './game-down.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDownComponent implements OnDestroy {
  constructor(private readonly redux: ReduxService) { }

  private readonly done$ = new DoneSubject();

  readonly state$ = this.redux.watch(state => state.game.down, this.done$);

  ngOnDestroy() { this.done$.done(); }
}
