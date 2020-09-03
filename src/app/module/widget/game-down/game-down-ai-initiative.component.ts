import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {watch} from 'dd-rx-state';
import {BehaviorSubject} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {resolveInitiative as resolveInitiativeIndices} from 'src/app/module/widget/game-down/data';
import {RxStateService, RxStateSetGameDownService} from 'src/app/rx-state';
import {trackByIndex} from 'src/app/util';
import {DiDashboardVisibilityFooter} from '../dashboard/di-dashboard-options';

@Component({
  selector: 'app-game-down-ai-initiative',
  templateUrl: './game-down-ai-initiative.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDownAiInitiativeComponent implements OnDestroy, OnInit {
  constructor(
    private readonly rxState: RxStateService,
    private readonly rxStateMutate: RxStateSetGameDownService,
    @Inject(DiDashboardVisibilityFooter) public readonly isVisibleFooter$: BehaviorSubject<boolean>,
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
    this.isVisibleFooter$.next(this.wasShowingFooter);
  }

  ngOnInit() {
    this.wasShowingFooter = this.isVisibleFooter$.value;
    this.isVisibleFooter$.next(false);
  }

  onClickIndex = (index: number) => this.rxStateMutate.setSceneSelectedIndex(index);
  onHoverIndex = (index: number, hovered: boolean) => this.rxStateMutate.setSceneHoveredIndex(hovered ? index : null);
}
