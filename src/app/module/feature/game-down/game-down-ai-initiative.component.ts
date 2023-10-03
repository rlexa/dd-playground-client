import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {DoneSubject, RxCleanup} from 'dd-rxjs';
import {map} from 'rxjs/operators';
import {trackByIndex} from 'src/app/util';
import {setUntilThenBack$} from 'src/app/util/set-until-then-back-rx';
import {DiDashboardVisibilityFooter} from '../../widget/dashboard/di-dashboard-options';
import {resolveInitiative as resolveInitiativeIndices} from './data';
import {DiSceneHoveredIndex, DiSceneSelectedIndex} from './di-game-down-values';
import {GameDownService} from './service';

@Component({
  selector: 'app-game-down-ai-initiative',
  templateUrl: './game-down-ai-initiative.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatListModule],
})
export class GameDownAiInitiativeComponent implements OnDestroy, OnInit {
  private readonly gameDownService = inject(GameDownService);
  readonly hovered$ = inject(DiSceneHoveredIndex);
  private readonly isVisibleFooter$ = inject(DiDashboardVisibilityFooter);
  readonly selected$ = inject(DiSceneSelectedIndex);

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
