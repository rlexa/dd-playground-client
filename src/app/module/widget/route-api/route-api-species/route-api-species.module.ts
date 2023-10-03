import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RouteRoot, RouteWild} from 'src/app/routing';
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
        path: RouteRoot,
        component: GhibliListDetailComponent,
        children: [
          {path: `:${routeParamIdSpecies}`, component: RoutedGhibliSpeciesDetailComponent},
          {path: RouteWild, redirectTo: RouteRoot},
        ],
      },
      {path: RouteWild, redirectTo: RouteRoot},
    ]),
  ],
})
class RouteApiSpeciesModule {}

export {RouteApiSpeciesModule};
