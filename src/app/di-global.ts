import {HttpClient} from '@angular/common/http';
import {inject, InjectionToken, Provider} from '@angular/core';
import {ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, distinctUntilChanged, filter, map, shareReplay, startWith} from 'rxjs/operators';
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

const mergeParams = (route: ActivatedRouteSnapshot, into: Record<string, string> = {}) => {
  route.paramMap.keys.forEach((key) => (into[key] = route.paramMap.get(key)));
  if (route.children.length) {
    route.children.forEach((child) => mergeParams(child, into));
  }
  return into;
};

/** Global version. */
export const DiGlobalRouterParams = new InjectionToken<Observable<Record<string, string>>>('Global Router params.');
export const DiGlobalRouterParamsProvider: Provider = {
  provide: DiGlobalRouterParams,
  deps: [Router],
  useFactory: (router: Router) =>
    router.events.pipe(
      // events is a cold stream, let's start with a fake navigation event with current state's url
      startWith(new NavigationEnd(0, router.routerState.snapshot.url, router.routerState.snapshot.url)),
      // only need end of navigation events for the current final resolved route
      filter((ev) => ev instanceof NavigationEnd),
      map(() => mergeParams(router.routerState.snapshot.root)),
      distinctUntilChanged(isEqualValue),
      shareReplay(1),
    ),
};
