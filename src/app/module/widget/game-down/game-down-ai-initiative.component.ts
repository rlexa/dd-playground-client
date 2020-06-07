import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {watch} from 'dd-rx-state';
import {map, shareReplay} from 'rxjs/operators';
import {resolveInitiative as resolveInitiativeIndices} from 'src/app/module/widget/game-down/data';
import {RxStateService, RxStateSetGameDownService} from 'src/app/rx-state';
import {RxStateSetUiService} from 'src/app/rx-state/rx-state-set-ui.service';
import {trackByIndex} from 'src/app/util';

@Component({
  selector: 'app-game-down-ai-initiative',
  templateUrl: './game-down-ai-initiative.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDownAiInitiativeComponent implements OnDestroy, OnInit {
  constructor(
    private readonly rxState: RxStateService,
    private readonly rxStateMutate: RxStateSetGameDownService,
    private readonly rxStateMutateUi: RxStateSetUiService,
  ) {}

  private wasShowingFooter = false;

  readonly fields$ = this.rxState.state$.pipe(watch((state) => state.game.down.scene.fields));
  readonly hovered$ = this.rxState.state$.pipe(
    watch((state) => state.game.down.scene.hoveredIndex),
    shareReplay(),
  );

  readonly resolvedInitiativeIndices$ = this.fields$.pipe(map(resolveInitiativeIndices));

  trackByIndex = trackByIndex;

  ngOnDestroy() {
    this.rxStateMutateUi.mergeDashboardState({isVisibleFooter: this.wasShowingFooter});
  }

  ngOnInit() {
    this.wasShowingFooter = this.rxState.getState().ui.dashboard.isVisibleFooter;
    this.rxStateMutateUi.mergeDashboardState({isVisibleFooter: false});
  }

  onClickIndex = (index: number) => this.rxStateMutate.setSceneSelectedIndex(index);
  onHoverIndex = (index: number, hovered: boolean) => this.rxStateMutate.setSceneHoveredIndex(hovered ? index : null);
}
