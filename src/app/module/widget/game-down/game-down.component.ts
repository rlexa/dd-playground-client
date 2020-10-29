import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Theme} from 'src/app/game';
import {GameDownColorMap} from './data';
import {DiDebugView, DiSceneHoveredIndex, DiSceneSelectedIndex, DiTheme} from './di-game-down-values';
import {GameDownService} from './service';
import {themeDownDefault, themes} from './theming';

@Component({
  selector: 'app-game-down',
  templateUrl: './game-down.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDownComponent {
  constructor(
    private readonly gameDownService: GameDownService,
    @Inject(DiDebugView) public readonly viewDebug$: Observable<boolean>,
    @Inject(DiSceneHoveredIndex) public readonly hovered$: Observable<number>,
    @Inject(DiSceneSelectedIndex) public readonly selected$: Observable<number>,
    @Inject(DiTheme) public readonly theme$: BehaviorSubject<string>,
  ) {
    this.gameDownService.setThemes(themes as Theme<GameDownColorMap>[]);
    this.theme$.next(themes.find((theme) => theme.name !== themeDownDefault.name).name);
  }

  readonly state$ = combineLatest([
    this.gameDownService.state$.pipe(map((state) => state.scene)),
    this.hovered$,
    this.selected$,
    this.viewDebug$,
  ]).pipe(map(([state, hovered, selected, debugView]) => ({...state, hovered, selected, debugView})));
}
