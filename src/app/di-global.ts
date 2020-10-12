import {HttpClient} from '@angular/common/http';
import {InjectionToken, Provider} from '@angular/core';
import {jsonEqual} from 'dd-rx-state';
import {Observable, of} from 'rxjs';
import {catchError, distinctUntilChanged, map, shareReplay} from 'rxjs/operators';

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
export const DiGlobalFlags = new InjectionToken<Observable<GlobalFlags>>('Global flags.');

export function factoryDiGlobalFlags(httpClient: HttpClient): Observable<GlobalFlags> {
  return httpClient
    .get<GlobalFlags>('/assets/flags.json', {responseType: 'json'})
    .pipe(
      catchError(() => of<GlobalFlags>(null)),
      distinctUntilChanged(jsonEqual),
      shareReplay(1),
    );
}

export const DiGlobalFlagsProvider: Provider = {
  provide: DiGlobalFlags,
  deps: [HttpClient],
  useFactory: factoryDiGlobalFlags,
};

/** Global title. */
export const DiGlobalTitle = new InjectionToken<Observable<string>>('Global title.');

export function factoryDiGlobalTitle(globalFlags: Observable<GlobalFlags>): Observable<string> {
  return globalFlags.pipe(
    map((flags) => flags?.title),
    distinctUntilChanged(),
    shareReplay(1),
  );
}

export const DiGlobalTitleProvider: Provider = {
  provide: DiGlobalTitle,
  deps: [DiGlobalFlags],
  useFactory: factoryDiGlobalTitle,
};

/** Global version. */
export const DiGlobalVersion = new InjectionToken<Observable<string>>('Global version.');

export function factoryDiGlobalVersion(globalFlags: Observable<GlobalFlags>): Observable<string> {
  return globalFlags.pipe(
    map((flags) => flags?.version),
    distinctUntilChanged(),
    shareReplay(1),
  );
}

export const DiGlobalVersionProvider: Provider = {
  provide: DiGlobalVersion,
  deps: [DiGlobalFlags],
  useFactory: factoryDiGlobalVersion,
};
