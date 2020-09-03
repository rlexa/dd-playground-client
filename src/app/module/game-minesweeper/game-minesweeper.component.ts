import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {rxFire_, rxNext_} from 'dd-rxjs';
import {BehaviorSubject, Subject} from 'rxjs';
import {filter, map, withLatestFrom} from 'rxjs/operators';
import {cleanupRx} from 'src/app/util/cleanup-rx';
import {Game, initGame, onInput, Preset, processFrame} from './logic';

@Component({
  selector: 'app-game-minesweeper',
  templateUrl: './game-minesweeper.component.html',
  styleUrls: ['./game-minesweeper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameMinesweeperComponent implements OnDestroy, OnInit {
  private timeLast = 0;

  public showMines = false;

  public game$ = new BehaviorSubject<Game>(null);
  public preset$ = new BehaviorSubject<Preset>({height: 15, mines: 15, width: 15});

  public triggerInit$ = new Subject();
  public triggerFrame$ = new Subject();
  public triggerInputIndex$ = new Subject<{index: number; alt: boolean}>();
  public toggleLoop$ = new BehaviorSubject(false);

  triggerInit = rxFire_(this.triggerInit$);
  triggerFrame = rxFire_(this.triggerFrame$);

  ngOnDestroy() {
    cleanupRx(this.game$, this.preset$, this.toggleLoop$, this.triggerFrame$, this.triggerInit$, this.triggerInputIndex$);
  }

  toggleLoop = () => this.toggleLoop$.next(!this.toggleLoop$.value);

  inputIndex = (index: number, alt: boolean) => this.triggerInputIndex$.next({index, alt});

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

    this.triggerInputIndex$
      .pipe(
        withLatestFrom(this.game$),
        filter(([_, game]) => !!game),
        map(([event, game]) =>
          onInput(game, {x: event.index % game.scene.map.width, y: Math.floor(event.index / game.scene.map.width), alt: event.alt}),
        ),
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
