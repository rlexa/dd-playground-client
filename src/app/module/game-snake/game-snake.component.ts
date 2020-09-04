import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DoneSubject, RxCleanup, rxFire_, rxNext_} from 'dd-rxjs';
import {BehaviorSubject, merge, Observable, Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
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
import {Game, Preset} from './logic-fns';

@Component({
  selector: 'app-game-snake',
  templateUrl: './game-snake.component.html',
  styleUrls: ['./game-snake.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DiGameSnakeProcessorDirectionProvider, DiGameSnakeProcessorFrameProvider, DiGameSnakeProcessorInitProvider],
})
export class GameSnakeComponent implements OnDestroy, OnInit {
  constructor(
    @Inject(DiGameSnake) public readonly game$: BehaviorSubject<Game>,
    @Inject(DiGameSnakePreset) public readonly preset$: Observable<Preset>,
    @Inject(DiGameSnakeProcessors) private readonly processors$: Observable<Game>[],
    @Inject(DiGameSnakeTriggerDirection) private readonly triggerDirection$: Subject<string>,
    @Inject(DiGameSnakeTriggerFrame) private readonly triggerFrame$: Subject<any>,
    @Inject(DiGameSnakeTriggerInit) private readonly triggerInit$: Subject<any>,
  ) {}

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
    this.toggleLoop$.pipe(filter(Boolean)).subscribe(this.onFrame);
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
