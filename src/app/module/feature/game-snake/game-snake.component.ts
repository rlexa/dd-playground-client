import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject} from '@angular/core';
import {DoneSubject, RxCleanup, rxFire_, rxNext_} from 'dd-rxjs';
import {BehaviorSubject, Observable, merge} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {SimpleViewComponent} from '../../widget/simple-view';
import {
  DiGameSnake,
  DiGameSnakePreset,
  DiGameSnakeProcessorDirectionProvider,
  DiGameSnakeProcessorFrameProvider,
  DiGameSnakeProcessorInitProvider,
  DiGameSnakeProcessors,
  DiGameSnakeTriggerDirection,
  DiGameSnakeTriggerFrame,
  DiGameSnakeTriggerInit,
} from './di-game-snake-values';
import {Game} from './logic-fns';
import {GameSnakeRenderHtmlComponent} from './render';

@Component({
  selector: 'app-game-snake',
  templateUrl: './game-snake.component.html',
  styleUrls: ['./game-snake.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, SimpleViewComponent, GameSnakeRenderHtmlComponent],
  providers: [DiGameSnakeProcessorDirectionProvider, DiGameSnakeProcessorFrameProvider, DiGameSnakeProcessorInitProvider],
})
export class GameSnakeComponent implements OnDestroy, OnInit {
  readonly game$ = inject(DiGameSnake);
  readonly preset$ = inject(DiGameSnakePreset);
  private readonly processors$ = inject(DiGameSnakeProcessors) as unknown as Observable<Game>[];
  private readonly triggerDirection$ = inject(DiGameSnakeTriggerDirection);
  private readonly triggerFrame$ = inject(DiGameSnakeTriggerFrame);
  private readonly triggerInit$ = inject(DiGameSnakeTriggerInit);

  private timeLast = 0;

  @RxCleanup() private readonly done$ = new DoneSubject();
  @RxCleanup() public readonly toggleLoop$ = new BehaviorSubject(false);

  triggerInit = rxFire_(this.triggerInit$);
  triggerFrame = rxFire_(this.triggerFrame$);
  triggerDirection = rxNext_(this.triggerDirection$);

  toggleLoop = () => this.toggleLoop$.next(!this.toggleLoop$.value);

  destroy() {}
  ngOnDestroy() {
    this.destroy();
  }

  ngOnInit() {
    merge(...this.processors$)
      .pipe(takeUntil(this.done$))
      .subscribe(rxNext_(this.game$));
    this.toggleLoop$.pipe(filter(Boolean)).subscribe(() => this.onFrame());
  }

  private onFrame = (time?: number) => {
    if (time === undefined) {
      this.timeLast = 0;
    } else if (this.timeLast <= 0) {
      this.timeLast = time;
    } else if (time - this.timeLast > 1000 / 8) {
      this.timeLast = time;
      this.triggerFrame();
    }

    if (!this.toggleLoop$.closed && this.toggleLoop$.value) {
      requestAnimationFrame(this.onFrame);
    }
  };
}
