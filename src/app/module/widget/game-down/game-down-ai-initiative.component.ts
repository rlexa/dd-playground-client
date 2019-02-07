import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { resolveInitiative as resolveInitiativeIndices } from 'app/module/widget/game-down/data';
import { RxStateService, RxStateSetGameDownService } from 'app/rx-state';
import { RxStateSetUiService } from 'app/rx-state/rx-state-set-ui.service';
import { trackByIndex } from 'app/util';
import { DoneSubject, RxCleanup } from 'dd-rxjs';
import { map, shareReplay } from 'rxjs/operators';

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
  ) { }

  private wasShowingFooter = false;
  @RxCleanup() private readonly done$ = new DoneSubject();

  readonly fields$ = this.rxState.watch(state => state.game.down.scene.fields, this.done$);
  readonly hovered$ = this.rxState.watch(state => state.game.down.scene.hoveredIndex, this.done$).pipe(shareReplay());

  readonly resolvedInitiativeIndices$ = this.fields$.pipe(map(resolveInitiativeIndices));

  trackByIndex = trackByIndex;

  ngOnDestroy() {
    this.rxStateMutateUi.mergeDashboardState({ isVisibleFooter: this.wasShowingFooter });
  }

  ngOnInit() {
    this.wasShowingFooter = this.rxState.state.ui.dashboard.isVisibleFooter;
    this.rxStateMutateUi.mergeDashboardState({ isVisibleFooter: false });
  }

  onClickIndex = (index: number) => this.rxStateMutate.setSceneSelectedIndex(index);
  onHoverIndex = (index: number, hovered: boolean) => this.rxStateMutate.setSceneHoveredIndex(hovered ? index : null);
}
