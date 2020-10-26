import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {GhibliSpecies} from '../api-ghibli.service';
import {DiRemoteCurrentItemToTitle} from '../di-api-common';
import {DiRemoteCurrentItem} from '../ghibli-detail';
import {DiRemoteCurrentList, GhibliListDetailModule} from '../ghibli-list-detail';
import {GhibliListDetailComponent} from '../ghibli-list-detail/ghibli-list-detail.component';
import {routeParamIdSpecies} from './api-species-route';
import {DiRemoteGhibliSpecies, DiRouteSpecies, DiRouteSpeciesProvider} from './di-ghibli-species';
import {GhibliSpeciesDetailModule, RoutedGhibliSpeciesDetailComponent} from './ghibli-species-detail';

@NgModule({
  providers: [
    DiRouteSpeciesProvider,
    {provide: DiRemoteCurrentList, useExisting: DiRemoteGhibliSpecies},
    {provide: DiRemoteCurrentItem, useExisting: DiRouteSpecies},
    {provide: DiRemoteCurrentItemToTitle, useValue: (item: GhibliSpecies) => item?.name},
  ],
  imports: [
    GhibliListDetailModule,
    GhibliSpeciesDetailModule,
    RouterModule.forChild([
      {
        path: ROUTE_ROOT,
        component: GhibliListDetailComponent,
        children: [
          {path: `:${routeParamIdSpecies}`, component: RoutedGhibliSpeciesDetailComponent},
          {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT},
        ],
      },
      {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT},
    ]),
  ],
})
class RouteApiSpeciesModule {}

export {RouteApiSpeciesModule};
