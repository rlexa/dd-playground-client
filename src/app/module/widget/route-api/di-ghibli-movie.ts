import {inject, InjectionToken} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, distinctUntilChanged, shareReplay} from 'rxjs/operators';
import {isEqualValue} from 'src/app/util';
import {ApiGhibliService, GhibliMovie} from './api-ghibli.service';

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
