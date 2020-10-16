import {HttpClient} from '@angular/common/http';
import {inject, InjectionToken} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, distinctUntilChanged, map, shareReplay} from 'rxjs/operators';
import {isEqualValue} from './util';

export interface GlobalFlags {
  buildId?: string;
  buildRevision?: string;
  buildSystem?: string;
  buildVariant?: string;
  project?: string;
  projectParent?: string;
  title?: string;
  version?: string;
}

/** Global flags. */
export const DiGlobalFlags = new InjectionToken<Observable<GlobalFlags>>('Global flags.', {
  providedIn: 'root',
  factory: () =>
    inject(HttpClient)
      .get<GlobalFlags>('/assets/flags.json', {responseType: 'json'})
      .pipe(
        catchError(() => of<GlobalFlags>(null)),
        distinctUntilChanged(isEqualValue),
        shareReplay(1),
      ),
});

/** Global title. */
export const DiGlobalTitle = new InjectionToken<Observable<string>>('Global title.', {
  providedIn: 'root',
  factory: () =>
    inject(DiGlobalFlags).pipe(
      map((flags) => flags?.title),
      distinctUntilChanged(),
      shareReplay(1),
    ),
});

/** Global version. */
export const DiGlobalVersion = new InjectionToken<Observable<string>>('Global version.', {
  providedIn: 'root',
  factory: () =>
    inject(DiGlobalFlags).pipe(
      map((flags) => flags?.version),
      distinctUntilChanged(),
      shareReplay(1),
    ),
});
