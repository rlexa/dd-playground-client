import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {GAMEDOWN_FIELD_H, GAMEDOWN_FIELD_W} from 'src/app/module/widget/game-down/data';
import {RxStateService, RxStateSetGameDownService} from 'src/app/rx-state';
import {RENDERER_SIMPLE} from 'src/app/rx-state/state/state-game-down';
import {DoneSubject, RxCleanup} from 'dd-rxjs';
import {combineLatest} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

@Component({
  selector: 'app-game-down-scene',
  templateUrl: './game-down-scene.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDownSceneComponent implements OnDestroy {
  constructor(private readonly rxState: RxStateService, private readonly rxStateMutate: RxStateSetGameDownService) {}

  @RxCleanup() private readonly done$ = new DoneSubject();
  private readonly themeName$ = this.rxState.watch(state => state.game.down.scene.theme, this.done$);

  readonly HEIGHT = Array.from(Array(GAMEDOWN_FIELD_H), (_, index) => index);
  readonly RENDERER_SIMPLE = RENDERER_SIMPLE;
  readonly WIDTH = Array.from(Array(GAMEDOWN_FIELD_W), (_, index) => index);

  readonly factor$ = this.rxState.watch(state => state.game.down.scene.factor, this.done$);
  readonly fields$ = this.rxState.watch(state => state.game.down.scene.fields, this.done$);
  readonly hovered$ = this.rxState.watch(state => state.game.down.scene.hoveredIndex, this.done$).pipe(shareReplay());
  readonly renderer$ = this.rxState.watch(state => state.game.down.scene.renderer, this.done$).pipe(shareReplay());
  readonly selected$ = this.rxState.watch(state => state.game.down.scene.selectedIndex, this.done$).pipe(shareReplay());
  readonly viewDebug$ = this.rxState.watch(state => state.game.down.viewDebug, this.done$).pipe(shareReplay());

  readonly theme$ = combineLatest([this.themeName$, this.rxState.watch(state => state.game.down.themes, this.done$)]).pipe(
    map(([name, themes]) => themes.find(_ => _.name === name)),
  );

  ngOnDestroy() {}

  onClick = (index: number) =>
    this.rxStateMutate.setSceneSelectedIndex(this.rxState.state.game.down.scene.selectedIndex === index ? null : index);
  onHover = (index: number, hovered: boolean) => this.rxStateMutate.setSceneHoveredIndex(hovered ? index : null);
}
