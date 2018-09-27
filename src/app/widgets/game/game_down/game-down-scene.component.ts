import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ReduxService } from 'app/redux';
import { GAME_DOWN_FIELD_H, GAME_DOWN_FIELD_W } from 'app/redux/game/down';
import { DoneSubject } from 'app/rx';

@Component({
  selector: 'app-game-down-scene',
  templateUrl: './game-down-scene.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDownSceneComponent implements OnDestroy {
  constructor(private readonly redux: ReduxService) { }

  private readonly done$ = new DoneSubject();

  readonly HEIGHT = Array.from(Array(GAME_DOWN_FIELD_H), (_, index) => index);
  readonly WIDTH = Array.from(Array(GAME_DOWN_FIELD_W), (_, index) => index);

  readonly theme$ = this.redux.watch(state => state.game.down.scene.theme, this.done$);
  readonly fields$ = this.redux.watch(state => state.game.down.scene.fields, this.done$);

  ngOnDestroy() { this.done$.done(); }
}
