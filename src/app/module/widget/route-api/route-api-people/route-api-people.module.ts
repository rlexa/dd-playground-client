import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RouteRoot, RouteWild} from 'src/app/routing';
import {GhibliPerson} from '../api-ghibli.service';
import {DiRemoteCurrentItemToTitle} from '../di-api-common';
import {DiRemoteCurrentItem} from '../ghibli-detail';
import {DiRemoteCurrentList, GhibliListDetailModule} from '../ghibli-list-detail';
import {GhibliListDetailComponent} from '../ghibli-list-detail/ghibli-list-detail.component';
import {routeParamIdPerson} from './api-people-route';
import {DiRemoteGhibliPeople, DiRoutePerson, DiRoutePersonProvider} from './di-ghibli-people';
import {GhibliPersonDetailModule, RoutedGhibliPersonDetailComponent} from './ghibli-person-detail';

@NgModule({
  providers: [
    DiRoutePersonProvider,
    {provide: DiRemoteCurrentList, useExisting: DiRemoteGhibliPeople},
    {provide: DiRemoteCurrentItem, useExisting: DiRoutePerson},
    {provide: DiRemoteCurrentItemToTitle, useValue: (item: GhibliPerson) => item?.name},
  ],
  imports: [
    GhibliListDetailModule,
    GhibliPersonDetailModule,
    RouterModule.forChild([
      {
        path: RouteRoot,
        component: GhibliListDetailComponent,
        children: [
          {path: `:${routeParamIdPerson}`, component: RoutedGhibliPersonDetailComponent},
          {path: RouteWild, redirectTo: RouteRoot},
        ],
      },
      {path: RouteWild, redirectTo: RouteRoot},
    ]),
  ],
})
class RouteApiPeopleModule {}

export {RouteApiPeopleModule};
