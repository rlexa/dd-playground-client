import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ReduxService, ReduxSetGameDownService } from 'app/redux';
import { entitiesToModifiers, GAME_DOWN_FIELD_H, GAME_DOWN_FIELD_W, RENDERER_SIMPLE } from 'app/redux/game/down';
import { DoneSubject } from 'app/rx';
import { combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-game-down-scene',
  templateUrl: './game-down-scene.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDownSceneComponent implements OnDestroy {
  constructor(
    private readonly redux: ReduxService,
    private readonly reduxSet: ReduxSetGameDownService,
  ) { }

  private readonly done$ = new DoneSubject();
  private readonly themeName$ = this.redux.watch(state => state.game.down.scene.theme, this.done$);

  readonly HEIGHT = Array.from(Array(GAME_DOWN_FIELD_H), (_, index) => index);
  readonly RENDERER_SIMPLE = RENDERER_SIMPLE;
  readonly WIDTH = Array.from(Array(GAME_DOWN_FIELD_W), (_, index) => index);

  readonly factor$ = this.redux.watch(state => state.game.down.scene.factor, this.done$);
  readonly fields$ = this.redux.watch(state => state.game.down.scene.fields, this.done$);
  readonly hovered$ = this.redux.watch(state => state.game.down.scene.hoveredIndex, this.done$).pipe(shareReplay());
  readonly renderer$ = this.redux.watch(state => state.game.down.scene.renderer, this.done$).pipe(shareReplay());
  readonly selected$ = this.redux.watch(state => state.game.down.scene.selectedIndex, this.done$).pipe(shareReplay());
  readonly viewDebug$ = this.redux.watch(state => state.game.down.viewDebug, this.done$).pipe(shareReplay());

  readonly theme$ = combineLatest(this.themeName$, this.redux.watch(state => state.game.down.themes, this.done$))
    .pipe(map(([name, themes]) => themes.find(_ => _.name === name)));

  readonly fieldsModifiers$ = this.fields$.pipe(map(_ => _.map(ii => ii.entities).map(entitiesToModifiers).map(ii => ii.map(jj => jj.toLocaleUpperCase().substr(0, 1)))));

  ngOnDestroy() { this.done$.done(); }

  onClick = (index: number) => this.reduxSet.setSceneSelectedIndex(this.redux.state.game.down.scene.selectedIndex === index ? null : index);
  onHover = (index: number, hovered: boolean) => this.reduxSet.setSceneHoveredIndex(hovered ? index : null);
}
