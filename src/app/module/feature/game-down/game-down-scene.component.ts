import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {combineLatest} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {GAMEDOWN_FIELD_H, GAMEDOWN_FIELD_W} from './data';
import {DiDebugView, DiSceneHoveredIndex, DiSceneSelectedIndex, DiTheme} from './di-game-down-values';
import {GameDownFieldComponent} from './game-down-field.component';
import {RenderSimpleFieldComponent} from './renderer';
import {GameDownService, RENDERER_SIMPLE} from './service';

@Component({
  selector: 'app-game-down-scene',
  templateUrl: './game-down-scene.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, GameDownFieldComponent, RenderSimpleFieldComponent],
})
export class GameDownSceneComponent {
  private readonly gameDownService = inject(GameDownService);
  readonly hovered$ = inject(DiSceneHoveredIndex);
  readonly viewDebug$ = inject(DiDebugView);
  readonly selected$ = inject(DiSceneSelectedIndex);
  readonly themeName$ = inject(DiTheme);

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
