import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {RxCleanup, rxFire_, rxNext_} from 'dd-rxjs';
import {BehaviorSubject, merge, Subject} from 'rxjs';
import {filter, map, withLatestFrom} from 'rxjs/operators';
import {Game, initGame, onInputDirection, Preset, processFrame, Vector} from './logic-fns';

@Component({
  selector: 'app-game-snake',
  templateUrl: './game-snake.component.html',
  styleUrls: ['./game-snake.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSnakeComponent implements OnDestroy, OnInit {
  private timeLast = 0;

  @RxCleanup() public readonly game$ = new BehaviorSubject<Game>(null);
  @RxCleanup() public readonly preset$ = new BehaviorSubject<Preset>({height: 15, width: 15});

  @RxCleanup() public readonly triggerInit$ = new Subject();
  @RxCleanup() public readonly triggerFrame$ = new Subject();
  @RxCleanup() public readonly triggerDirection$ = new Subject<string>();
  @RxCleanup() public readonly toggleLoop$ = new BehaviorSubject(false);

  private readonly processDirection$ = this.triggerDirection$.pipe(
    filter((dir) => ['L', 'U', 'R', 'D'].includes(dir)),
    map((dir) => ({x: dir === 'L' ? -1 : dir === 'R' ? 1 : 0, y: dir === 'U' ? -1 : dir === 'D' ? 1 : 0} as Vector)),
    withLatestFrom(this.game$),
    filter(([vec, game]) => !!game),
    map(([vec, game]) => onInputDirection(game, vec)),
  );

  private readonly processFrame$ = this.triggerFrame$.pipe(
    withLatestFrom(this.game$),
    map(([_, game]) => game),
    filter((game) => !!game),
    map((game) => processFrame(game)),
  );

  private readonly processInit$ = this.triggerInit$.pipe(
    withLatestFrom(this.preset$),
    map(([_, preset]) => preset),
    map(initGame),
  );

  private readonly processors$ = merge(this.processDirection$, this.processFrame$, this.processInit$);

  triggerInit = rxFire_(this.triggerInit$);
  triggerFrame = rxFire_(this.triggerFrame$);
  triggerDirection = rxNext_(this.triggerDirection$);

  toggleLoop = () => this.toggleLoop$.next(!this.toggleLoop$.value);

  destroy() {}
  ngOnDestroy() {
    this.destroy();
  }

  ngOnInit() {
    this.processors$.subscribe(rxNext_(this.game$));
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
