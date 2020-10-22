import {inject, InjectionToken, Provider} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';
import {DiGlobalRouterParams} from 'src/app/di-global';
import {isEqualValue} from 'src/app/util';
import {ApiGhibliService, GhibliVehicle} from '../api-ghibli.service';
import {routeParamIdVehicle} from './api-vehicles-route';

export const DiRemoteGhibliVehicles = new InjectionToken<Observable<GhibliVehicle[]>>('API loaded vehicles.', {
  providedIn: 'root',
  factory: () =>
    inject(ApiGhibliService)
      .vehicles$()
      .pipe(
        catchError(() => of<GhibliVehicle[]>(null)),
        distinctUntilChanged(isEqualValue),
        shareReplay({refCount: true, bufferSize: 1}),
      ),
});

export const DiRouteVehicleId = new InjectionToken<Observable<string>>('Route vehicle id.', {
  providedIn: 'root',
  factory: () =>
    inject(DiGlobalRouterParams).pipe(
      map((params) => params?.[routeParamIdVehicle] ?? ''),
      distinctUntilChanged(),
      shareReplay({refCount: true, bufferSize: 1}),
    ),
});

export const DiRouteVehicle = new InjectionToken<Observable<GhibliVehicle>>('Route vehicle.');
export const DiRouteVehicleProvider: Provider = {
  provide: DiRouteVehicle,
  deps: [DiRouteVehicleId, ApiGhibliService],
  useFactory: (id$: Observable<string>, api: ApiGhibliService) =>
    id$.pipe(
      switchMap((id) => (!id ? of<GhibliVehicle>(null) : api.vehicle$(id))),
      distinctUntilChanged(),
      shareReplay({refCount: true, bufferSize: 1}),
    ),
};
