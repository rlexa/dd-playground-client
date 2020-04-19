import {ChangeDetectionStrategy, Component, Input, OnDestroy} from '@angular/core';
import {RxCleanup} from 'dd-rxjs';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {distinctUntilChanged, filter, map} from 'rxjs/operators';
import {trackByIndex} from 'src/app/util';
import {Game} from '../logic';

type FIELD = 'empty';

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

  private readonly state$ = this.game$.pipe(filter(game => !!game));

  private readonly high$ = this.state$.pipe(
    map(st => st.scene.map.height),
    distinctUntilChanged(),
  );
  private readonly wide$ = this.state$.pipe(
    map(st => st.scene.map.width),
    distinctUntilChanged(),
  );

  private readonly cells$: Observable<FIELD[]> = combineLatest([this.high$, this.wide$]).pipe(
    map(([high, wide]) => high * wide),
    distinctUntilChanged(),
    map(size => Array.from(new Array(size), (): FIELD => 'empty')),
  );

  public readonly gridColRepeat$ = this.wide$.pipe(map(ii => `repeat(${ii}, 1fr)`));

  public readonly fields$ = combineLatest([this.cells$, this.wide$]).pipe(
    map(([cells, wide]) => {
      cells.forEach((ii, index) => (cells[index] = 'empty'));
      return cells;
    }),
  );

  trackByIndex = trackByIndex;

  ngOnDestroy() {}
}
