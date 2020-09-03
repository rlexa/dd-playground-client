import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {watch} from 'dd-rx-state';
import {DoneSubject} from 'dd-rxjs';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {resolveInitiative as resolveInitiativeIndices} from 'src/app/module/widget/game-down/data';
import {RxStateService, RxStateSetGameDownService} from 'src/app/rx-state';
import {trackByIndex} from 'src/app/util';
import {cleanupRx} from 'src/app/util/cleanup-rx';
import {setUntilThenBack$} from 'src/app/util/set-until-then-back-rx';
import {DiDashboardVisibilityFooter} from '../dashboard/di-dashboard-options';
import {DiSceneHoveredIndex} from './di-game-down-values';

@Component({
  selector: 'app-game-down-ai-initiative',
  templateUrl: './game-down-ai-initiative.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDownAiInitiativeComponent implements OnDestroy, OnInit {
  constructor(
    private readonly rxState: RxStateService,
    private readonly rxStateMutate: RxStateSetGameDownService,
    @Inject(DiDashboardVisibilityFooter) private readonly isVisibleFooter$: BehaviorSubject<boolean>,
    @Inject(DiSceneHoveredIndex) public readonly hovered$: BehaviorSubject<number>,
  ) {}

  private readonly done$ = new DoneSubject();

  readonly fields$ = this.rxState.state$.pipe(watch((state) => state.game.down.scene.fields));

  readonly resolvedInitiativeIndices$ = this.fields$.pipe(map(resolveInitiativeIndices));

  trackByIndex = trackByIndex;

  ngOnDestroy() {
    cleanupRx(this.done$);
  }

  ngOnInit() {
    setUntilThenBack$(this.isVisibleFooter$, false, this.done$).subscribe();
  }

  onClickIndex = (index: number) => this.rxStateMutate.setSceneSelectedIndex(index);
  onHoverIndex = (index: number, hovered: boolean) => this.hovered$.next(hovered ? index ?? null : null);
}
