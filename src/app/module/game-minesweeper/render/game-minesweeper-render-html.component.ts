import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {RxCleanup} from 'dd-rxjs';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {distinctUntilChanged, filter, map} from 'rxjs/operators';
import {trackByIndex} from 'src/app/util';
import {Game, getNeighbourVectorsAround} from '../logic';

type FIELD = 'clear' | 'empty' | 'flag' | 'mine';

@Component({
  selector: 'app-game-minesweeper-render-html',
  templateUrl: './game-minesweeper-render-html.component.html',
  styleUrls: ['./game-minesweeper-render-html.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameMinesweeperRenderHtmlComponent implements OnDestroy {
  @RxCleanup() public readonly game$ = new BehaviorSubject<Game>(null);

  @Input() set game(val: Game) {
    this.game$.next(val || null);
  }

  @Input() showMines = false;

  @Output() clickedIndex = new EventEmitter<{index: number; alt: boolean}>();

  private readonly state$ = this.game$.pipe(filter((game) => !!game));

  private readonly high$ = this.state$.pipe(
    map((st) => st.scene.map.height),
    distinctUntilChanged(),
  );
  private readonly clear$ = this.state$.pipe(
    map((st) => st.scene.clear),
    distinctUntilChanged(),
  );
  private readonly flags$ = this.state$.pipe(
    map((st) => st.scene.flags),
    distinctUntilChanged(),
  );
  private readonly mines$ = this.state$.pipe(
    map((st) => st.scene.mines),
    distinctUntilChanged(),
  );

  public readonly wide$ = this.state$.pipe(
    map((st) => st.scene.map.width),
    distinctUntilChanged(),
  );

  private readonly cells$: Observable<FIELD[]> = combineLatest([this.high$, this.wide$]).pipe(
    map(([high, wide]) => high * wide),
    distinctUntilChanged(),
    map((size) => Array.from(new Array(size), (): FIELD => 'empty')),
  );

  public readonly lost$ = this.state$.pipe(
    map((st) => st.state === 'lost'),
    distinctUntilChanged(),
  );

  private readonly fields$ = combineLatest([this.cells$, this.wide$, this.mines$, this.flags$, this.clear$]).pipe(
    map(([cells, wide, mines, flags, clear]) => {
      cells.forEach((ii, index) => (cells[index] = 'empty'));
      if (mines) {
        mines.forEach((vec) => (cells[vec.x + vec.y * wide] = 'mine'));
      }
      flags.forEach((vec) => (cells[vec.x + vec.y * wide] = 'flag'));
      clear.forEach((vec) => (cells[vec.x + vec.y * wide] = 'clear'));
      return cells;
    }),
  );

  public readonly trtds$ = combineLatest([this.fields$, this.wide$]).pipe(
    map(([fields, wide]) =>
      fields.reduce<FIELD[][]>((acc, ii, index) => {
        acc[Math.floor(index / wide)] = [...(acc[Math.floor(index / wide)] || []), ii];
        return acc;
      }, []),
    ),
  );

  public readonly indexMineCount$ = combineLatest([this.cells$, this.mines$, this.wide$, this.high$]).pipe(
    map(([cells, mines, wide, high]) =>
      cells.map((cell, index) => {
        if (!mines || !mines.length) {
          return 0;
        }
        return getNeighbourVectorsAround({x: index % wide, y: Math.floor(index / wide)}, wide, high).reduce<number>(
          (acc, vec) => (mines.some((ii) => ii.y === vec.y && ii.x === vec.x) ? acc + 1 : acc),
          0,
        );
      }),
    ),
  );

  trackByIndex = trackByIndex;

  destroy() {}
  ngOnDestroy() {
    this.destroy();
  }

  onClickIndex = (index: number, ev: MouseEvent) => this.clickedIndex.emit({index, alt: ev.shiftKey || ev.altKey || ev.metaKey});
  onAuxClickIndex = (index: number) => this.clickedIndex.emit({index, alt: true});
}
