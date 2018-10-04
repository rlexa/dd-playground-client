import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { GhibliApiService } from 'app/ghibli';
import { DoneSubject, rxComplete, rxNext_ } from 'app/rx';
import { Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-ghibli',
  templateUrl: './ghibli.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhibliComponent implements OnDestroy {
  constructor(
    private readonly api: GhibliApiService,
  ) { }

  private readonly done$ = new DoneSubject();

  readonly anyData$ = new Subject();

  ngOnDestroy() {
    this.done$.done();
    rxComplete(this.anyData$);
  }

  getFilms = () => this.toAnyData(this.api.films$);
  getLocations = () => this.toAnyData(this.api.locations$);
  getPersons = () => this.toAnyData(this.api.persons$);
  getSpeciess = () => this.toAnyData(this.api.speciess$);
  getVehicles = () => this.toAnyData(this.api.vehicles$);

  private toAnyData = <T>(switchTo: (val: T) => Observable<any>, param?: T) => of(param)
    .pipe(switchMap(switchTo))
    .subscribe(rxNext_(this.anyData$), rxNext_(this.anyData$));
}
