import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {RxStateService, RxStateSetGameDownService} from 'app/rx-state';
import {DoneSubject, RxCleanup} from 'dd-rxjs';
import {themes, themeDownDefault} from './theming';

@Component({
  selector: 'app-game-down',
  templateUrl: './game-down.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDownComponent implements OnDestroy {
  constructor(private readonly rxState: RxStateService, private readonly rxStateMutate: RxStateSetGameDownService) {
    this.rxStateMutate.setThemes(themes);
    this.rxStateMutate.setSceneTheme(themes.find(_ => _.name !== themeDownDefault.name).name);
  }

  @RxCleanup() private readonly done$ = new DoneSubject();
  readonly state$ = this.rxState.watch(state => state.game.down.scene, this.done$);
  ngOnDestroy() {}
}
