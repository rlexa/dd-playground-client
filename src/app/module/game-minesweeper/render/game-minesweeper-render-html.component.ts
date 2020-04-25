import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {RxCleanup} from 'dd-rxjs';
import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import {distinctUntilChanged, filter, map, withLatestFrom} from 'rxjs/operators';
import {trackByIndex} from 'src/app/util';
import {Game} from '../logic';

type FIELD = 'empty' | 'mine' | 'flag';

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

  private readonly state$ = this.game$.pipe(filter(game => !!game));

  private readonly high$ = this.state$.pipe(
    map(st => st.scene.map.height),
    distinctUntilChanged(),
  );
  private readonly wide$ = this.state$.pipe(
    map(st => st.scene.map.width),
    distinctUntilChanged(),
  );
  private readonly flags$ = this.state$.pipe(
    map(st => st.scene.flags),
    distinctUntilChanged(),
  );
  private readonly mines$ = this.state$.pipe(
    map(st => st.scene.mines),
    distinctUntilChanged(),
  );

  private readonly cells$: Observable<FIELD[]> = combineLatest([this.high$, this.wide$]).pipe(
    map(([high, wide]) => high * wide),
    distinctUntilChanged(),
    map(size => Array.from(new Array(size), (): FIELD => 'empty')),
  );

  public readonly lost$ = this.state$.pipe(
    map(st => st.state === 'lost'),
    distinctUntilChanged(),
  );

  private readonly fields$ = combineLatest([this.cells$, this.wide$, this.mines$, this.flags$]).pipe(
    map(([cells, wide, mines, flags]) => {
      cells.forEach((ii, index) => (cells[index] = 'empty'));
      if (mines) {
        mines.forEach(vec => (cells[vec.x + vec.y * wide] = 'mine'));
      }
      flags.forEach(vec => (cells[vec.x + vec.y * wide] = 'flag'));
      return cells;
    }),
  );

  public readonly trtds$ = combineLatest([this.fields$, this.wide$]).pipe(
    map(([fields, wide]) => {
      return fields.reduce<FIELD[][]>((acc, ii, index) => {
        acc[Math.floor(index / wide)] = [...(acc[Math.floor(index / wide)] || []), ii];
        return acc;
      }, []);
    }),
  );

  trackByIndex = trackByIndex;

  ngOnDestroy() {}

  onClickRowCol = (row: number, col: number, ev: MouseEvent) =>
    of(row)
      .pipe(
        withLatestFrom(this.wide$),
        map(([currow, wide]) => currow * wide + col),
      )
      .subscribe(index => this.onClickIndex(index, ev));

  onClickIndex = (index: number, ev: MouseEvent) => {
    this.clickedIndex.emit({index, alt: ev.shiftKey || ev.altKey || ev.metaKey});
  };
}
