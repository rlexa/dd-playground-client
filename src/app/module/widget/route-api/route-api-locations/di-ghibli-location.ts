import {inject, InjectionToken, Provider} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';
import {DiGlobalRouterParams} from 'src/app/di-global';
import {isEqualValue} from 'src/app/util';
import {ApiGhibliService, GhibliLocation} from '../api-ghibli.service';
import {routeParamIdLocation} from './api-locations-route';

export const DiRemoteGhibliLocations = new InjectionToken<Observable<GhibliLocation[]>>('API loaded locations.', {
  providedIn: 'root',
  factory: () =>
    inject(ApiGhibliService)
      .locations$()
      .pipe(
        catchError(() => of(null as GhibliLocation[])),
        distinctUntilChanged(isEqualValue),
        shareReplay({refCount: true, bufferSize: 1}),
      ),
});

export const DiRouteLocationId = new InjectionToken<Observable<string>>('Route location id.', {
  providedIn: 'root',
  factory: () =>
    inject(DiGlobalRouterParams).pipe(
      map((params) => params?.[routeParamIdLocation] ?? ''),
      distinctUntilChanged(),
      shareReplay({refCount: true, bufferSize: 1}),
    ),
});

export const DiRouteLocation = new InjectionToken<Observable<GhibliLocation>>('Route location.');
export const DiRouteLocationProvider: Provider = {
  provide: DiRouteLocation,
  deps: [DiRouteLocationId, ApiGhibliService],
  useFactory: (id$: Observable<string>, api: ApiGhibliService) =>
    id$.pipe(
      switchMap((id) => (!id ? of<GhibliLocation>(null) : api.location$(id))),
      distinctUntilChanged(),
      shareReplay({refCount: true, bufferSize: 1}),
    ),
};
