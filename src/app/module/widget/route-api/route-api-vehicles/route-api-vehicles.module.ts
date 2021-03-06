import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {GhibliVehicle} from '../api-ghibli.service';
import {DiRemoteCurrentItemToTitle} from '../di-api-common';
import {DiRemoteCurrentItem} from '../ghibli-detail';
import {DiRemoteCurrentList, GhibliListDetailModule} from '../ghibli-list-detail';
import {GhibliListDetailComponent} from '../ghibli-list-detail/ghibli-list-detail.component';
import {routeParamIdVehicle} from './api-vehicles-route';
import {DiRemoteGhibliVehicles, DiRouteVehicle, DiRouteVehicleProvider} from './di-ghibli-vehicles';
import {GhiblVehicleDetailModule, RoutedGhibliVehicleDetailComponent} from './ghibli-vehicle-detail';

@NgModule({
  providers: [
    DiRouteVehicleProvider,
    {provide: DiRemoteCurrentList, useExisting: DiRemoteGhibliVehicles},
    {provide: DiRemoteCurrentItem, useExisting: DiRouteVehicle},
    {provide: DiRemoteCurrentItemToTitle, useValue: (item: GhibliVehicle) => item?.name},
  ],
  imports: [
    GhibliListDetailModule,
    GhiblVehicleDetailModule,
    RouterModule.forChild([
      {
        path: ROUTE_ROOT,
        component: GhibliListDetailComponent,
        children: [
          {path: `:${routeParamIdVehicle}`, component: RoutedGhibliVehicleDetailComponent},
          {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT},
        ],
      },
      {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT},
    ]),
  ],
})
class RouteApiVehiclesModule {}

export {RouteApiVehiclesModule};
