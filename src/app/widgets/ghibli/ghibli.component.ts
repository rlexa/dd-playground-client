import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { GhibliApiService, GHIBLI_TYPES, GHIBLI_TYPE_FILM, GHIBLI_TYPE_LOCATION, GHIBLI_TYPE_PEOPLE, GHIBLI_TYPE_SPECIES, GHIBLI_TYPE_VEHICLES } from 'app/ghibli';
import { DoneSubject, rxComplete, rxNext_ } from 'app/rx';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { filter, finalize, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-ghibli',
  templateUrl: './ghibli.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhibliComponent implements OnDestroy {
  constructor(
    private readonly api: GhibliApiService,
  ) { }

  private readonly TYPE_TO_GET_DETAILS = {
    [GHIBLI_TYPE_FILM]: this.api.film$,
    [GHIBLI_TYPE_LOCATION]: this.api.location$,
    [GHIBLI_TYPE_PEOPLE]: this.api.person$,
    [GHIBLI_TYPE_SPECIES]: this.api.species$,
    [GHIBLI_TYPE_VEHICLES]: this.api.vehicle$,
  };
  private readonly done$ = new DoneSubject();

  readonly TYPE_TO_GET_LIST = {
    [GHIBLI_TYPE_FILM]: this.api.films$,
    [GHIBLI_TYPE_LOCATION]: this.api.locations$,
    [GHIBLI_TYPE_PEOPLE]: this.api.persons$,
    [GHIBLI_TYPE_SPECIES]: this.api.speciess$,
    [GHIBLI_TYPE_VEHICLES]: this.api.vehicles$,
  };
  readonly TYPES_LISTS = Object.keys(this.TYPE_TO_GET_LIST);

  readonly anyData$ = new Subject();
  readonly busyCount$ = new BehaviorSubject(0);

  ngOnDestroy() {
    this.done$.done();
    rxComplete(this.anyData$, this.busyCount$);
  }

  clickableValue = (key: string, value: any) => typeof value === 'string' && GHIBLI_TYPES.findIndex(_ => value.includes(_)) >= 0;

  onClickedValue = (key: string, value: any) => {
    if (typeof value === 'string') {
      const ghibliType = GHIBLI_TYPES.find(_ => value.includes(_));
      if (ghibliType) {
        const id = value.substr(ghibliType.length);
        const getter = (id ? this.TYPE_TO_GET_DETAILS : this.TYPE_TO_GET_LIST)[ghibliType];
        this.toAnyData(getter, id);
      }
    }
  }

  toAnyData = <T>(switchTo: (val: T) => Observable<any>, param?: T) => of(param)
    .pipe(
      filter(_ => !!switchTo),
      tap(() => this.busyCount$.next(this.busyCount$.value + 1)),
      switchMap(switchTo),
      finalize(() => this.busyCount$.next(this.busyCount$.value - 1)))
    .subscribe(rxNext_(this.anyData$), rxNext_(this.anyData$));
}
