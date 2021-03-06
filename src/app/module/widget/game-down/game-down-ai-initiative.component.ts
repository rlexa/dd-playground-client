import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DoneSubject, RxCleanup} from 'dd-rxjs';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {resolveInitiative as resolveInitiativeIndices} from 'src/app/module/widget/game-down/data';
import {trackByIndex} from 'src/app/util';
import {setUntilThenBack$} from 'src/app/util/set-until-then-back-rx';
import {DiDashboardVisibilityFooter} from '../dashboard/di-dashboard-options';
import {DiSceneHoveredIndex, DiSceneSelectedIndex} from './di-game-down-values';
import {GameDownService} from './service';

@Component({
  selector: 'app-game-down-ai-initiative',
  templateUrl: './game-down-ai-initiative.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDownAiInitiativeComponent implements OnDestroy, OnInit {
  constructor(
    private readonly gameDownService: GameDownService,
    @Inject(DiDashboardVisibilityFooter) private readonly isVisibleFooter$: BehaviorSubject<boolean>,
    @Inject(DiSceneHoveredIndex) public readonly hovered$: BehaviorSubject<number>,
    @Inject(DiSceneSelectedIndex) public readonly selected$: BehaviorSubject<number>,
  ) {}

  @RxCleanup() private readonly done$ = new DoneSubject();

  readonly fields$ = this.gameDownService.state$.pipe(map((state) => state.scene.fields));

  readonly resolvedInitiativeIndices$ = this.fields$.pipe(map(resolveInitiativeIndices));

  trackByIndex = trackByIndex;

  destroy() {}
  ngOnDestroy() {
    this.destroy();
  }

  ngOnInit() {
    setUntilThenBack$(this.isVisibleFooter$, false, this.done$).subscribe();
  }

  onClickIndex = (index: number) => this.selected$.next(index ?? null);
  onHoverIndex = (index: number, hovered: boolean) => this.hovered$.next(hovered ? index ?? null : null);
}
