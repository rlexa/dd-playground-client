import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FORMAT_DATE_TIMESTAMP } from 'app/presets';
import { DoneSubject, rxComplete, rxNext_, rxNull, rxTrue } from 'app/rx';
import { trackByIndex } from 'app/util';
import { BehaviorSubject, combineLatest, merge } from 'rxjs';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleTableComponent implements OnDestroy, OnInit {
  @HostBinding('style.display') readonly styleDisplay = 'flex';
  @HostBinding('style.flexDirection') readonly styleFlexDirection = 'column';

  private readonly done$ = new DoneSubject();

  readonly FORMAT_DATE_TIMESTAMP = FORMAT_DATE_TIMESTAMP;

  readonly filter$ = new BehaviorSubject(<string>null);
  readonly sortAsc$ = new BehaviorSubject(true);
  readonly sortBy$ = new BehaviorSubject(<string>null);
  readonly page$ = new BehaviorSubject(0);
  readonly pageSize$ = new BehaviorSubject(10);

  readonly data$ = new BehaviorSubject([]);
  readonly total$ = this.data$.pipe(map(_ => (_ || []).length));

  readonly columns$ = this.data$.pipe(map(_ => Object.entries((_ || [])[0] || {}).filter(([key, val]) => typeof val !== 'object').map(([key, val]) => key)));
  readonly dataBatch$ = combineLatest(this.page$, this.pageSize$, this.filter$, this.sortAsc$, this.sortBy$, this.columns$, this.data$)
    .pipe(
      debounceTime(0),
      map(([page, size, filtering, sortAsc, sortBy, columns, data]) => (data || [])
        .filter(item => !filtering || columns.some(col => (item[col] || '').toString().toLocaleLowerCase().includes(filtering.toLocaleLowerCase())))
        .sort((aa, bb) => {
          return sortBy ? (typeof aa[sortBy] === 'string' ? (aa[sortBy] as string).localeCompare(bb[sortBy]) : aa[sortBy] - bb[sortBy]) * (sortAsc ? 1 : -1) : 0;
        })
        .slice(page * size, page * size + size)),
      takeUntil(this.done$));

  setFilter = rxNext_(this.filter$);
  setPage = rxNext_(this.page$);
  setSortAsc = rxNext_(this.sortAsc$);
  setSortBy = rxNext_(this.sortBy$);

  trackByIndex = trackByIndex;

  @Output() dblClick = new EventEmitter<any>();

  @Input() set data(val: any[]) { this.data$.next(val); }

  ngOnDestroy() {
    this.done$.done();
    rxComplete(
      this.data$,
      this.filter$,
      this.page$,
      this.pageSize$,
      this.sortAsc$,
      this.sortBy$,
    );
  }

  ngOnInit() {
    merge(this.data$, this.pageSize$, this.filter$, this.sortAsc$, this.sortBy$)
      .pipe(map(() => 0), filter(_ => _ !== this.page$.value), takeUntil(this.done$))
      .subscribe(rxNext_(this.page$));

    combineLatest(this.columns$, this.sortBy$)
      .pipe(filter(([columns, sortBy]) => !!sortBy && !columns.includes(sortBy)), takeUntil(this.done$))
      .subscribe(() => {
        rxNull(this.sortBy$);
        rxTrue(this.sortAsc$);
      });
  }

  onRowDoubleClick = (item: any) => this.dblClick.emit(item);

  onSortChange = (sortBy: string, sortAsc: boolean) => {
    this.setSortBy(sortBy);
    this.setSortAsc(sortAsc);
  }
}
