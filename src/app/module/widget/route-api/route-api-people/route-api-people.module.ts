import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {GhibliPerson} from '../api-ghibli.service';
import {DiRemoteCurrentItemToTitle} from '../di-api-common';
import {DiRemoteCurrentItem, GhibliDetailComponent} from '../ghibli-detail';
import {DiRemoteCurrentList, GhibliListDetailModule} from '../ghibli-list-detail';
import {GhibliListDetailComponent} from '../ghibli-list-detail/ghibli-list-detail.component';
import {routeParamIdPerson} from './api-people-route';
import {DiRemoteGhibliPeople, DiRoutePerson, DiRoutePersonProvider} from './di-ghibli-people';

@NgModule({
  providers: [
    DiRoutePersonProvider,
    {provide: DiRemoteCurrentList, useExisting: DiRemoteGhibliPeople},
    {provide: DiRemoteCurrentItem, useExisting: DiRoutePerson},
    {provide: DiRemoteCurrentItemToTitle, useValue: (item: GhibliPerson) => item?.name},
  ],
  imports: [
    GhibliListDetailModule,
    RouterModule.forChild([
      {
        path: ROUTE_ROOT,
        component: GhibliListDetailComponent,
        children: [
          {path: `:${routeParamIdPerson}`, component: GhibliDetailComponent},
          {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT},
        ],
      },
      {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT},
    ]),
  ],
})
class RouteApiPeopleModule {}

export {RouteApiPeopleModule};
