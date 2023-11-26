import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input, OnDestroy} from '@angular/core';
import {RxCleanup} from 'dd-rxjs';
import {BehaviorSubject, Observable, combineLatest} from 'rxjs';
import {distinctUntilChanged, filter, map} from 'rxjs/operators';
import {Game} from '../logic-fns';

type FIELD = 'empty' | 'food' | 'snake' | 'head';

@Component({
  selector: 'app-game-snake-render-html',
  template: `@if (game$ | async) {
    <div class="scope" [ngStyle]="{'grid-template-columns': gridColRepeat$ | async}">
      @for (field of fields$ | async; track $index) {
        <div class="field field-{{ field }}"></div>
      }
    </div>
  }`,
  styleUrls: ['./game-snake-render-html.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class GameSnakeRenderHtmlComponent implements OnDestroy {
  @RxCleanup() public readonly game$ = new BehaviorSubject<Game>(null);

  @Input() set game(val: Game) {
    this.game$.next(val || null);
  }

  private readonly state$ = this.game$.pipe(filter((game) => !!game));

  private readonly high$ = this.state$.pipe(
    map((st) => st.scene.map.height),
    distinctUntilChanged(),
  );
  private readonly wide$ = this.state$.pipe(
    map((st) => st.scene.map.width),
    distinctUntilChanged(),
  );
  private readonly food$ = this.state$.pipe(
    map((st) => st.scene.map.food),
    distinctUntilChanged(),
  );
  private readonly snake$ = this.state$.pipe(
    map((st) => st.scene.map.snake),
    distinctUntilChanged(),
  );

  private readonly cells$: Observable<FIELD[]> = combineLatest([this.high$, this.wide$]).pipe(
    map(([high, wide]) => high * wide),
    distinctUntilChanged(),
    map((size) => Array.from(new Array(size), (): FIELD => 'empty')),
  );

  public readonly gridColRepeat$ = this.wide$.pipe(map((ii) => `repeat(${ii}, 1fr)`));

  public readonly fields$ = combineLatest([this.cells$, this.wide$, this.food$, this.snake$]).pipe(
    map(([cells, wide, food, snake]) => {
      cells.forEach((ii, index) => (cells[index] = 'empty'));
      if (food) {
        cells[food.position.y * wide + food.position.x] = 'food';
      }
      if (snake) {
        snake.positions.forEach((pos) => (cells[pos.y * wide + pos.x] = 'snake'));
        cells[snake.positions[0].y * wide + snake.positions[0].x] = 'head';
      }
      return cells;
    }),
  );

  destroy() {}
  ngOnDestroy() {
    this.destroy();
  }
}
