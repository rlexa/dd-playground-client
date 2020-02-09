import {ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FORMAT_DATE_TIMESTAMP} from 'src/app/presets';
import {trackByIndex} from 'src/app/util';
import {DoneSubject, RxCleanup, rxNext_, rxNull, rxTrue} from 'dd-rxjs';
import {BehaviorSubject, combineLatest, merge} from 'rxjs';
import {debounceTime, filter, map, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleTableComponent implements OnDestroy, OnInit {
  @HostBinding('style.display') readonly styleDisplay = 'flex';
  @HostBinding('style.flexDirection') readonly styleFlexDirection = 'column';

  @RxCleanup() private readonly done$ = new DoneSubject();
  @RxCleanup() private readonly data$ = new BehaviorSubject([]);

  readonly FORMAT_DATE_TIMESTAMP = FORMAT_DATE_TIMESTAMP;

  @RxCleanup() readonly filter$ = new BehaviorSubject<string>(null);
  @RxCleanup() readonly sortAsc$ = new BehaviorSubject(true);
  @RxCleanup() readonly sortBy$ = new BehaviorSubject<string>(null);
  @RxCleanup() readonly page$ = new BehaviorSubject(0);
  @RxCleanup() readonly pageSize$ = new BehaviorSubject(10);

  readonly columns$ = this.data$.pipe(
    map(_ =>
      Object.entries((_ || [])[0] || {})
        .filter(([key, val]) => typeof val !== 'object')
        .map(([key, val]) => key),
    ),
  );
  private readonly dataFiltered$ = combineLatest([this.data$, this.columns$, this.filter$]).pipe(
    debounceTime(0),
    map(([data, columns, filtering]) =>
      (data || []).filter(
        item =>
          !filtering ||
          columns.some(col =>
            (item[col] || '')
              .toString()
              .toLocaleLowerCase()
              .includes(filtering.toLocaleLowerCase()),
          ),
      ),
    ),
    takeUntil(this.done$),
  );
  readonly total$ = this.dataFiltered$.pipe(map(_ => (_ || []).length));

  readonly dataBatch$ = combineLatest([this.page$, this.pageSize$, this.sortAsc$, this.sortBy$, this.dataFiltered$]).pipe(
    debounceTime(0),
    map(([page, size, sortAsc, sortBy, data]) =>
      (data || [])
        .sort((aa, bb) => {
          return sortBy
            ? (typeof aa[sortBy] === 'string' ? (aa[sortBy] as string).localeCompare(bb[sortBy]) : aa[sortBy] - bb[sortBy]) *
                (sortAsc ? 1 : -1)
            : 0;
        })
        .slice(page * size, page * size + size),
    ),
    takeUntil(this.done$),
  );

  readonly dataBatchClickables$ = this.dataBatch$.pipe(
    map(_ =>
      _.map(item =>
        Object.entries(item || {})
          .filter(([key, val]) => this.isClickable && this.isClickable(key, val))
          .map(([key]) => key),
      ),
    ),
  );

  setFilter = rxNext_(this.filter$);
  setPage = rxNext_(this.page$);
  setSortAsc = rxNext_(this.sortAsc$);
  setSortBy = rxNext_(this.sortBy$);

  trackByIndex = trackByIndex;

  @Output() clicked = new EventEmitter<{key: string; value: any}>();
  @Output() dblClick = new EventEmitter<any>();

  @Input() set data(val: any[]) {
    this.data$.next(val);
  }
  @Input() isClickable: (key: string, val: any) => boolean = null;

  ngOnDestroy() {}

  ngOnInit() {
    merge(this.dataFiltered$, this.pageSize$, this.filter$, this.sortAsc$, this.sortBy$)
      .pipe(
        map(() => 0),
        filter(_ => _ !== this.page$.value),
        takeUntil(this.done$),
      )
      .subscribe(rxNext_(this.page$));

    combineLatest([this.columns$, this.sortBy$])
      .pipe(
        filter(([columns, sortBy]) => !!sortBy && !columns.includes(sortBy)),
        takeUntil(this.done$),
      )
      .subscribe(() => {
        rxNull(this.sortBy$);
        rxTrue(this.sortAsc$);
      });
  }

  onClicked = (key: string, value: any) => this.clicked.emit({key, value});
  onRowDoubleClick = (item: any) => this.dblClick.emit(item);

  onSortChange = (sortBy: string, sortAsc: boolean) => {
    this.setSortBy(sortBy);
    this.setSortAsc(sortAsc);
  };
}
