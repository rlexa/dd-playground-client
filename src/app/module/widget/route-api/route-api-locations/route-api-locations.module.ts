import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {GhibliLocation} from '../api-ghibli.service';
import {DiRemoteCurrentItemToTitle} from '../di-api-common';
import {DiRemoteCurrentItem} from '../ghibli-detail';
import {DiRemoteCurrentList, GhibliListDetailModule} from '../ghibli-list-detail';
import {GhibliListDetailComponent} from '../ghibli-list-detail/ghibli-list-detail.component';
import {routeParamIdLocation} from './api-locations-route';
import {DiRemoteGhibliLocations, DiRouteLocation, DiRouteLocationProvider} from './di-ghibli-location';
import {GhibliLocationDetailModule, RoutedGhibliLocationDetailComponent} from './ghibli-location-detail';

@NgModule({
  providers: [
    DiRouteLocationProvider,
    {provide: DiRemoteCurrentList, useExisting: DiRemoteGhibliLocations},
    {provide: DiRemoteCurrentItem, useExisting: DiRouteLocation},
    {provide: DiRemoteCurrentItemToTitle, useValue: (item: GhibliLocation) => item?.name},
  ],
  imports: [
    GhibliListDetailModule,
    GhibliLocationDetailModule,
    RouterModule.forChild([
      {
        path: ROUTE_ROOT,
        component: GhibliListDetailComponent,
        children: [
          {path: `:${routeParamIdLocation}`, component: RoutedGhibliLocationDetailComponent},
          {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT},
        ],
      },
      {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT},
    ]),
  ],
})
class RouteApiLocationsModule {}

export {RouteApiLocationsModule};
