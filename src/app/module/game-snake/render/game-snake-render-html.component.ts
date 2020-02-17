import {ChangeDetectionStrategy, Component, Input, OnDestroy} from '@angular/core';
import {RxCleanup} from 'dd-rxjs';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {trackByIndex} from 'src/app/util';
import {Game} from '../logic';

type FIELD = 'empty' | 'food' | 'snake' | 'head';

@Component({
  selector: 'app-game-snake-render-html',
  templateUrl: './game-snake-render-html.component.html',
  styleUrls: ['./game-snake-render-html.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSnakeRenderHtmlComponent implements OnDestroy {
  @RxCleanup() public readonly game$ = new BehaviorSubject<Game>(null);

  @Input() set game(val: Game) {
    this.game$.next(val || null);
  }

  public readonly gridColRepeat$ = this.game$.pipe(
    filter(ii => !!ii),
    map(ii => `repeat(${ii.scene.map.width}, 1fr)`),
  );

  public readonly fields$: Observable<FIELD[]> = this.game$.pipe(
    filter(ii => !!ii),
    map(game => {
      const fields = Array.from(new Array(game.scene.map.width * game.scene.map.height), (): FIELD => 'empty');
      const food = game.scene.map.food;
      if (food) {
        fields[food.position.y * game.scene.map.width + food.position.x] = 'food';
      }
      const snake = game.scene.map.snake;
      if (snake) {
        snake.positions.forEach((pos, index) => (fields[pos.y * game.scene.map.width + pos.x] = index ? 'snake' : 'head'));
      }
      return fields;
    }),
  );

  trackByIndex = trackByIndex;

  ngOnDestroy() {}
}
