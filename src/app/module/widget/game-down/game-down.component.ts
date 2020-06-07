import {ChangeDetectionStrategy, Component} from '@angular/core';
import {watch} from 'dd-rx-state';
import {RxStateService, RxStateSetGameDownService} from 'src/app/rx-state';
import {themeDownDefault, themes} from './theming';

@Component({
  selector: 'app-game-down',
  templateUrl: './game-down.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDownComponent {
  constructor(private readonly rxState: RxStateService, private readonly rxStateMutate: RxStateSetGameDownService) {
    this.rxStateMutate.setThemes(themes);
    this.rxStateMutate.setSceneTheme(themes.find((_) => _.name !== themeDownDefault.name).name);
  }

  readonly state$ = this.rxState.state$.pipe(watch((state) => state.game.down.scene));
}
