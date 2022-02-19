import {inject, InjectionToken, Provider} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';
import {DiGlobalRouterParams} from 'src/app/di-global';
import {isEqualValue} from 'src/app/util';
import {ApiGhibliService, GhibliMovie} from '../api-ghibli.service';
import {routeParamIdMovie} from './api-movies-route';

export const DiRemoteGhibliMovies = new InjectionToken<Observable<GhibliMovie[]>>('API loaded movies.', {
  providedIn: 'root',
  factory: () =>
    inject(ApiGhibliService)
      .movies$()
      .pipe(
        catchError(() => of(null as GhibliMovie[])),
        distinctUntilChanged(isEqualValue),
        shareReplay({refCount: true, bufferSize: 1}),
      ),
});

export const DiRouteMovieId = new InjectionToken<Observable<string>>('Route movie id.', {
  providedIn: 'root',
  factory: () =>
    inject(DiGlobalRouterParams).pipe(
      map((params) => params?.[routeParamIdMovie] ?? ''),
      distinctUntilChanged(),
      shareReplay({refCount: true, bufferSize: 1}),
    ),
});

export const DiRouteMovie = new InjectionToken<Observable<GhibliMovie>>('Route movie.');
export const DiRouteMovieProvider: Provider = {
  provide: DiRouteMovie,
  deps: [DiRouteMovieId, ApiGhibliService],
  useFactory: (id$: Observable<string>, api: ApiGhibliService) =>
    id$.pipe(
      switchMap((id) => (!id ? of<GhibliMovie>(null) : api.movie$(id))),
      distinctUntilChanged(),
      shareReplay({refCount: true, bufferSize: 1}),
    ),
};
