import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {watch} from 'dd-rx-state';
import {DoneSubject} from 'dd-rxjs';
import {BehaviorSubject, of} from 'rxjs';
import {finalize, map, shareReplay, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {resolveInitiative as resolveInitiativeIndices} from 'src/app/module/widget/game-down/data';
import {RxStateService, RxStateSetGameDownService} from 'src/app/rx-state';
import {trackByIndex} from 'src/app/util';
import {cleanupRx} from 'src/app/util/cleanup-rx';
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
    @Inject(DiDashboardVisibilityFooter) private readonly isVisibleFooter$: BehaviorSubject<boolean>,
  ) {}

  private readonly done$ = new DoneSubject();

  readonly fields$ = this.rxState.state$.pipe(watch((state) => state.game.down.scene.fields));
  readonly hovered$ = this.rxState.state$.pipe(
    watch((state) => state.game.down.scene.hoveredIndex),
    shareReplay(),
  );

  readonly resolvedInitiativeIndices$ = this.fields$.pipe(map(resolveInitiativeIndices));

  trackByIndex = trackByIndex;

  ngOnDestroy() {
    cleanupRx(this.done$);
  }

  ngOnInit() {
    of(false)
      .pipe(
        withLatestFrom(this.isVisibleFooter$),
        tap(([current, last]) => this.isVisibleFooter$.next(current)),
        switchMap(([current, last]) => this.done$.pipe(finalize(() => this.isVisibleFooter$.next(last)))),
      )
      .subscribe();
  }

  onClickIndex = (index: number) => this.rxStateMutate.setSceneSelectedIndex(index);
  onHoverIndex = (index: number, hovered: boolean) => this.rxStateMutate.setSceneHoveredIndex(hovered ? index : null);
}
