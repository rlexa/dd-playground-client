import {inject, InjectionToken, Provider} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';
import {DiGlobalRouterParams} from 'src/app/di-global';
import {isEqualValue} from 'src/app/util';
import {ApiGhibliService, GhibliSpecies} from '../api-ghibli.service';
import {routeParamIdSpecies} from './api-species-route';

export const DiRemoteGhibliSpecies = new InjectionToken<Observable<GhibliSpecies[]>>('API loaded species.', {
  providedIn: 'root',
  factory: () =>
    inject(ApiGhibliService)
      .speciess$()
      .pipe(
        catchError(() => of(null as GhibliSpecies[])),
        distinctUntilChanged(isEqualValue),
        shareReplay({refCount: true, bufferSize: 1}),
      ),
});

export const DiRouteSpeciesId = new InjectionToken<Observable<string>>('Route species id.', {
  providedIn: 'root',
  factory: () =>
    inject(DiGlobalRouterParams).pipe(
      map((params) => params?.[routeParamIdSpecies] ?? ''),
      distinctUntilChanged(),
      shareReplay({refCount: true, bufferSize: 1}),
    ),
});

export const DiRouteSpecies = new InjectionToken<Observable<GhibliSpecies>>('Route species.');
export const DiRouteSpeciesProvider: Provider = {
  provide: DiRouteSpecies,
  deps: [DiRouteSpeciesId, ApiGhibliService],
  useFactory: (id$: Observable<string>, api: ApiGhibliService) =>
    id$.pipe(
      switchMap((id) => (!id ? of<GhibliSpecies>(null) : api.species$(id))),
      distinctUntilChanged(),
      shareReplay({refCount: true, bufferSize: 1}),
    ),
};
