import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, OnDestroy, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {DoneSubject, RxCleanup, rxNext_} from 'dd-rxjs';
import {BehaviorSubject, Observable, Subject, of} from 'rxjs';
import {filter, finalize, map, switchMap, tap} from 'rxjs/operators';
import {GHIBLI_TYPES, GhibliApiService, GhibliEntity, GhibliType} from 'src/app/module/service/ghibli-api';
import {FlexboxDirective} from '../../directive/flexbox';
import {LoadingBarComponent} from '../../widget/loading-bar';
import {SimpleTableComponent} from '../../widget/simple-table';
import {SimpleViewComponent} from '../../widget/simple-view';

@Component({
  selector: 'app-ghibli',
  templateUrl: './ghibli.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    FlexboxDirective,
    LoadingBarComponent,
    SimpleTableComponent,
    SimpleViewComponent,
  ],
})
export class GhibliComponent implements OnDestroy {
  private readonly api = inject(GhibliApiService);

  private readonly typeToDetails$: Record<GhibliType, (id: string) => Observable<GhibliEntity>> = {
    [GhibliType.Location]: this.api.location$,
    [GhibliType.Movie]: this.api.film$,
    [GhibliType.Person]: this.api.person$,
    [GhibliType.Species]: this.api.species$,
    [GhibliType.Vehicles]: this.api.vehicle$,
  };

  @RxCleanup() private readonly done$ = new DoneSubject();

  readonly typeToList$: Record<GhibliType, () => Observable<GhibliEntity[]>> = {
    [GhibliType.Location]: this.api.locations$,
    [GhibliType.Movie]: this.api.films$,
    [GhibliType.Person]: this.api.persons$,
    [GhibliType.Species]: this.api.speciess$,
    [GhibliType.Vehicles]: this.api.vehicles$,
  };
  readonly TYPES_LISTS = Object.keys(this.typeToList$);

  @RxCleanup() readonly anyData$ = new Subject();
  @RxCleanup() readonly busyCount$ = new BehaviorSubject(0);

  readonly tableAllData$ = this.anyData$.pipe(map((_) => (Array.isArray(_) ? _ : null)));

  destroy() {}
  ngOnDestroy() {
    this.destroy();
  }

  clickableValue = (key: string, value: any) => typeof value === 'string' && GHIBLI_TYPES.findIndex((_) => value.includes(_)) >= 0;

  onClickedValue = (key: string, value: any) => {
    if (typeof value === 'string') {
      const ghibliType = GHIBLI_TYPES.find((_) => value.includes(_));
      if (ghibliType) {
        const id = value.substr(ghibliType.length);
        const getter = (id ? this.typeToDetails$ : this.typeToList$)[ghibliType];
        this.toAnyData(getter, id);
      }
    }
  };

  toAnyData = <T>(switchTo: (val: T) => Observable<any>, param?: T) =>
    of(param)
      .pipe(
        filter((_) => !!switchTo),
        tap(() => this.busyCount$.next(this.busyCount$.value + 1)),
        switchMap(switchTo),
        finalize(() => this.busyCount$.next(this.busyCount$.value - 1)),
      )
      .subscribe(rxNext_(this.anyData$), rxNext_(this.anyData$));
}
