import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {GAMEDOWN_FIELD_H, GAMEDOWN_FIELD_W} from 'src/app/module/widget/game-down/data';
import {DiDebugView, DiSceneHoveredIndex, DiSceneSelectedIndex, DiTheme} from './di-game-down-values';
import {GameDownService, RENDERER_SIMPLE} from './service';

@Component({
  selector: 'app-game-down-scene',
  templateUrl: './game-down-scene.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDownSceneComponent {
  constructor(
    private readonly gameDownService: GameDownService,
    @Inject(DiDebugView) public readonly viewDebug$: Observable<boolean>,
    @Inject(DiSceneHoveredIndex) public readonly hovered$: BehaviorSubject<number>,
    @Inject(DiSceneSelectedIndex) public readonly selected$: BehaviorSubject<number>,
    @Inject(DiTheme) public readonly themeName$: BehaviorSubject<string>,
  ) {}

  readonly HEIGHT = Array.from(Array(GAMEDOWN_FIELD_H), (_, index) => index);
  readonly RENDERER_SIMPLE = RENDERER_SIMPLE;
  readonly WIDTH = Array.from(Array(GAMEDOWN_FIELD_W), (_, index) => index);

  readonly factor$ = this.gameDownService.state$.pipe(map((state) => state.scene.factor));
  readonly fields$ = this.gameDownService.state$.pipe(map((state) => state.scene.fields));
  readonly renderer$ = this.gameDownService.state$.pipe(
    map((state) => state.scene.renderer),
    shareReplay(),
  );

  readonly theme$ = combineLatest([this.themeName$, this.gameDownService.state$.pipe(map((state) => state.themes))]).pipe(
    map(([name, themes]) => themes.find((_) => _.name === name)),
  );

  onClick = (index: number) => this.selected$.next(this.selected$.value === index ? null : index);
  onHover = (index: number, hovered: boolean) => this.hovered$.next(hovered ? index ?? null : null);
}
