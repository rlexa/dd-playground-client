import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, OnInit, inject} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {FlexboxDirective} from '../../directive/flexbox';
import {SimpleViewComponent} from '../../widget/simple-view';
import {GameDownColorMap} from './data';
import {DiDebugView, DiSceneHoveredIndex, DiSceneSelectedIndex, DiTheme} from './di-game-down-values';
import {GameDownConfigComponent} from './game-down-config.component';
import {GameDownSceneComponent} from './game-down-scene.component';
import {GameDownService} from './service';
import {Theme} from './theme';
import {themeDownDefault, themes} from './theming';

@Component({
  selector: 'app-game-down',
  templateUrl: './game-down.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FlexboxDirective, GameDownConfigComponent, GameDownSceneComponent, MatCardModule, SimpleViewComponent],
})
export class GameDownComponent implements OnInit {
  private readonly gameDownService = inject(GameDownService);
  readonly hovered$ = inject(DiSceneHoveredIndex);
  readonly selected$ = inject(DiSceneSelectedIndex);
  readonly theme$ = inject(DiTheme);
  readonly viewDebug$ = inject(DiDebugView);

  readonly state$ = combineLatest([
    this.gameDownService.state$.pipe(map((state) => state.scene)),
    this.hovered$,
    this.selected$,
    this.viewDebug$,
  ]).pipe(map(([state, hovered, selected, debugView]) => ({...state, hovered, selected, debugView})));

  ngOnInit() {
    this.gameDownService.setThemes(themes as Theme<GameDownColorMap>[]);
    this.theme$.next(themes.find((theme) => theme.name !== themeDownDefault.name).name);
  }
}
