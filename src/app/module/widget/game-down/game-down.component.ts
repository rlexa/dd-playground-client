import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {watch} from 'dd-rx-state';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {RxStateService, RxStateSetGameDownService} from 'src/app/rx-state';
import {DiDebugView, DiSceneHoveredIndex, DiSceneSelectedIndex, DiTheme} from './di-game-down-values';
import {themeDownDefault, themes} from './theming';

@Component({
  selector: 'app-game-down',
  templateUrl: './game-down.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDownComponent {
  constructor(
    private readonly rxState: RxStateService,
    private readonly rxStateMutate: RxStateSetGameDownService,
    @Inject(DiDebugView) public readonly viewDebug$: Observable<boolean>,
    @Inject(DiSceneHoveredIndex) public readonly hovered$: Observable<number>,
    @Inject(DiSceneSelectedIndex) public readonly selected$: Observable<number>,
    @Inject(DiTheme) public readonly theme$: BehaviorSubject<string>,
  ) {
    this.rxStateMutate.setThemes(themes);
    this.theme$.next(themes.find((theme) => theme.name !== themeDownDefault.name).name);
  }

  readonly state$ = combineLatest([
    this.rxState.state$.pipe(watch((state) => state.game.down.scene)),
    this.hovered$,
    this.selected$,
    this.viewDebug$,
  ]).pipe(map(([state, hovered, selected, debugView]) => ({...state, hovered, selected, debugView})));
}
