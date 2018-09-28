import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ReduxService, ReduxSetGameDownService } from 'app/redux';
import { DoneSubject } from 'app/rx';
import { themes, theme_down_default } from './theming';

@Component({
  selector: 'app-game-down',
  templateUrl: './game-down.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDownComponent implements OnDestroy {
  constructor(
    private readonly redux: ReduxService,
    private readonly reduxSet: ReduxSetGameDownService,
  ) {
    this.reduxSet.setThemes(themes);
    this.reduxSet.setSceneTheme(themes.find(_ => _.name !== theme_down_default.name).name);
  }

  private readonly done$ = new DoneSubject();

  readonly state$ = this.redux.watch(state => state.game.down, this.done$);

  ngOnDestroy() { this.done$.done(); }
}
