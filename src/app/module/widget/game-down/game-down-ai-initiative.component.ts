import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { resolveInitiative as resolveInitiativeIndices } from 'app/module/widget/game-down/data';
import { RxStateService, RxStateSetGameDownService } from 'app/rx-state';
import { trackByIndex } from 'app/util';
import { DoneSubject, RxCleanup } from 'dd-rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-game-down-ai-initiative',
  templateUrl: './game-down-ai-initiative.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDownAiInitiativeComponent implements OnDestroy {
  constructor(
    private readonly rxState: RxStateService,
    private readonly rxStateMutate: RxStateSetGameDownService,
  ) { }

  @RxCleanup() private readonly done$ = new DoneSubject();

  readonly fields$ = this.rxState.watch(state => state.game.down.scene.fields, this.done$);
  readonly hovered$ = this.rxState.watch(state => state.game.down.scene.hoveredIndex, this.done$).pipe(shareReplay());

  readonly resolvedInitiativeIndices$ = this.fields$.pipe(map(resolveInitiativeIndices));

  trackByIndex = trackByIndex;

  ngOnDestroy() { }

  onClickIndex = (index: number) => this.rxStateMutate.setSceneSelectedIndex(index);
  onHoverIndex = (index: number, hovered: boolean) => this.rxStateMutate.setSceneHoveredIndex(hovered ? index : null);
}
