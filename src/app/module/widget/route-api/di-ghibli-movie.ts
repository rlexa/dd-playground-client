import {inject, InjectionToken} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, distinctUntilChanged, map, shareReplay} from 'rxjs/operators';
import {DiGlobalRouterParams} from 'src/app/di-global';
import {isEqualValue} from 'src/app/util';
import {ApiGhibliService, GhibliMovie} from './api-ghibli.service';
import {routeParamIdMovie} from './api-route';

export const DiRemoteGhibliMovies = new InjectionToken<Observable<GhibliMovie[]>>('API loaded movies.', {
  providedIn: 'root',
  factory: () =>
    inject(ApiGhibliService)
      .movies$()
      .pipe(
        catchError(() => of<GhibliMovie[]>(null)),
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
