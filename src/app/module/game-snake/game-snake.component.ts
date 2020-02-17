import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {RxCleanup, rxFire_, rxNext_} from 'dd-rxjs';
import {BehaviorSubject, Subject} from 'rxjs';
import {filter, map, withLatestFrom} from 'rxjs/operators';
import {Game, initGame, onInputDirection, Preset, redProcessFrame, Vector} from './logic';

@Component({
  selector: 'app-game-snake',
  templateUrl: './game-snake.component.html',
  styleUrls: ['./game-snake.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSnakeComponent implements OnDestroy, OnInit {
  @RxCleanup() public game$ = new BehaviorSubject<Game>(null);
  @RxCleanup() public preset$ = new BehaviorSubject<Preset>({height: 15, width: 15});

  @RxCleanup() public triggerInit$ = new Subject();
  @RxCleanup() public triggerFrame$ = new Subject();
  @RxCleanup() public triggerDirection$ = new Subject<string>();

  triggerInit = rxFire_(this.triggerInit$);
  triggerFrame = rxFire_(this.triggerFrame$);
  triggerDirection = rxNext_(this.triggerDirection$);

  ngOnDestroy() {}

  ngOnInit() {
    this.triggerFrame$
      .pipe(
        withLatestFrom(this.game$),
        map(([_, game]) => game),
        filter(game => !!game),
        map(redProcessFrame),
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
        filter(dir => ['L', 'U', 'R', 'D'].includes(dir)),
        map(dir => ({x: dir === 'L' ? -1 : dir === 'R' ? 1 : 0, y: dir === 'U' ? -1 : dir === 'D' ? 1 : 0} as Vector)),
        withLatestFrom(this.game$),
        filter(([vec, game]) => !!game),
        map(([vec, game]) => onInputDirection(game, vec)),
      )
      .subscribe(rxNext_(this.game$));
  }
}
