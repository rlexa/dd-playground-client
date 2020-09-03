import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {rxFire_, rxNext_} from 'dd-rxjs';
import {BehaviorSubject, Subject} from 'rxjs';
import {filter, map, withLatestFrom} from 'rxjs/operators';
import {cleanupRx} from 'src/app/util/cleanup-rx';
import {Game, initGame, onInputDirection, Preset, processFrame, Vector} from './logic-fns';

@Component({
  selector: 'app-game-snake',
  templateUrl: './game-snake.component.html',
  styleUrls: ['./game-snake.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSnakeComponent implements OnDestroy, OnInit {
  private timeLast = 0;

  public game$ = new BehaviorSubject<Game>(null);
  public preset$ = new BehaviorSubject<Preset>({height: 15, width: 15});

  public triggerInit$ = new Subject();
  public triggerFrame$ = new Subject();
  public triggerDirection$ = new Subject<string>();
  public toggleLoop$ = new BehaviorSubject(false);

  triggerInit = rxFire_(this.triggerInit$);
  triggerFrame = rxFire_(this.triggerFrame$);
  triggerDirection = rxNext_(this.triggerDirection$);

  toggleLoop = () => this.toggleLoop$.next(!this.toggleLoop$.value);

  ngOnDestroy() {
    cleanupRx(this.game$, this.preset$, this.toggleLoop$, this.triggerDirection$, this.triggerFrame$, this.triggerInit$);
  }

  ngOnInit() {
    this.triggerFrame$
      .pipe(
        withLatestFrom(this.game$),
        map(([_, game]) => game),
        filter((game) => !!game),
        map((game) => processFrame(game)),
      )
      .subscribe(rxNext_(this.game$));

    this.triggerInit$
      .pipe(
        withLatestFrom(this.preset$),
        map(([_, preset]) => preset),
        map(initGame),
      )
      .subscribe(rxNext_(this.game$));

    this.triggerDirection$
      .pipe(
        filter((dir) => ['L', 'U', 'R', 'D'].includes(dir)),
        map((dir) => ({x: dir === 'L' ? -1 : dir === 'R' ? 1 : 0, y: dir === 'U' ? -1 : dir === 'D' ? 1 : 0} as Vector)),
        withLatestFrom(this.game$),
        filter(([vec, game]) => !!game),
        map(([vec, game]) => onInputDirection(game, vec)),
      )
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
