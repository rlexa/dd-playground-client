import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {watch} from 'dd-rx-state';
import {Observable, combineLatest} from 'rxjs';
import {RxStateService, RxStateSetGameDownService} from 'src/app/rx-state';
import {DiSceneHoveredIndex} from './di-game-down-values';
import {themeDownDefault, themes} from './theming';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-game-down',
  templateUrl: './game-down.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDownComponent {
  constructor(
    private readonly rxState: RxStateService,
    private readonly rxStateMutate: RxStateSetGameDownService,
    @Inject(DiSceneHoveredIndex) public readonly hovered$: Observable<number>,
  ) {
    this.rxStateMutate.setThemes(themes);
    this.rxStateMutate.setSceneTheme(themes.find((_) => _.name !== themeDownDefault.name).name);
  }

  readonly state$ = combineLatest([this.rxState.state$.pipe(watch((state) => state.game.down.scene)), this.hovered$]).pipe(
    map(([state, hovered]) => ({...state, diHovered: hovered})),
  );
}
