import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {watch} from 'dd-rx-state';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {GAMEDOWN_FIELD_H, GAMEDOWN_FIELD_W} from 'src/app/module/widget/game-down/data';
import {RxStateService} from 'src/app/rx-state';
import {RENDERER_SIMPLE} from 'src/app/rx-state/state/state-game-down';
import {DiSceneHoveredIndex, DiSceneSelectedIndex} from './di-game-down-values';

@Component({
  selector: 'app-game-down-scene',
  templateUrl: './game-down-scene.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDownSceneComponent {
  constructor(
    private readonly rxState: RxStateService,
    @Inject(DiSceneHoveredIndex) public readonly hovered$: BehaviorSubject<number>,
    @Inject(DiSceneSelectedIndex) public readonly selected$: BehaviorSubject<number>,
  ) {}

  private readonly themeName$ = this.rxState.state$.pipe(watch((state) => state.game.down.scene.theme));

  readonly HEIGHT = Array.from(Array(GAMEDOWN_FIELD_H), (_, index) => index);
  readonly RENDERER_SIMPLE = RENDERER_SIMPLE;
  readonly WIDTH = Array.from(Array(GAMEDOWN_FIELD_W), (_, index) => index);

  readonly factor$ = this.rxState.state$.pipe(watch((state) => state.game.down.scene.factor));
  readonly fields$ = this.rxState.state$.pipe(watch((state) => state.game.down.scene.fields));
  readonly renderer$ = this.rxState.state$.pipe(
    watch((state) => state.game.down.scene.renderer),
    shareReplay(),
  );
  readonly viewDebug$ = this.rxState.state$.pipe(
    watch((state) => state.game.down.viewDebug),
    shareReplay(),
  );

  readonly theme$ = combineLatest([this.themeName$, this.rxState.state$.pipe(watch((state) => state.game.down.themes))]).pipe(
    map(([name, themes]) => themes.find((_) => _.name === name)),
  );

  onClick = (index: number) => this.selected$.next(this.selected$.value === index ? null : index);
  onHover = (index: number, hovered: boolean) => this.hovered$.next(hovered ? index ?? null : null);
}
