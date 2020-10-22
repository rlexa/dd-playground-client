import {inject, InjectionToken, Provider} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';
import {DiGlobalRouterParams} from 'src/app/di-global';
import {isEqualValue} from 'src/app/util';
import {ApiGhibliService, GhibliPerson} from '../api-ghibli.service';
import {routeParamIdPerson} from './api-people-route';

export const DiRemoteGhibliPeople = new InjectionToken<Observable<GhibliPerson[]>>('API loaded people.', {
  providedIn: 'root',
  factory: () =>
    inject(ApiGhibliService)
      .persons$()
      .pipe(
        catchError(() => of<GhibliPerson[]>(null)),
        distinctUntilChanged(isEqualValue),
        shareReplay({refCount: true, bufferSize: 1}),
      ),
});

export const DiRoutePersonId = new InjectionToken<Observable<string>>('Route person id.', {
  providedIn: 'root',
  factory: () =>
    inject(DiGlobalRouterParams).pipe(
      map((params) => params?.[routeParamIdPerson] ?? ''),
      distinctUntilChanged(),
      shareReplay({refCount: true, bufferSize: 1}),
    ),
});

export const DiRoutePerson = new InjectionToken<Observable<GhibliPerson>>('Route person.');
export const DiRoutePersonProvider: Provider = {
  provide: DiRoutePerson,
  deps: [DiRoutePersonId, ApiGhibliService],
  useFactory: (id$: Observable<string>, api: ApiGhibliService) =>
    id$.pipe(
      switchMap((id) => (!id ? of<GhibliPerson>(null) : api.person$(id))),
      distinctUntilChanged(),
      shareReplay({refCount: true, bufferSize: 1}),
    ),
};
