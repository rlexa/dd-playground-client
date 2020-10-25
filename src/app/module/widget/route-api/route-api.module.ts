import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {NavigationBarItem, NavigationBarItemsData} from '../navigation-bar';
import {NavigationContentComponent, NavigationContentComponentData, NavigationContentModule} from '../navigation-content';
import {GhibliLocation, GhibliMovie, GhibliPerson, GhibliSpecies, GhibliVehicle} from './api-ghibli.service';
import {ApiRoute, apiRouteIcon, apiRouteTooltip} from './api-route';
import {DiRemoteCurrentItemToId} from './di-api-common';

const data: NavigationBarItemsData & NavigationContentComponentData = {
  navigationBarItems: Object.values(ApiRoute).map<NavigationBarItem>((route) => ({
    route,
    icon: apiRouteIcon[route],
    label: apiRouteTooltip[route],
  })),
  navigationContentScrollable: false,
};

const ROUTING: Routes = [
  {
    path: ROUTE_ROOT,
    component: NavigationContentComponent,
    data,
    children: [
      {
        path: ApiRoute.Location,
        loadChildren: () =>
          import('src/app/module/widget/route-api/route-api-locations/route-api-locations.module').then((m) => m.RouteApiLocationsModule),
      },
      {
        path: ApiRoute.Movie,
        loadChildren: () =>
          import('src/app/module/widget/route-api/route-api-movies/route-api-movies.module').then((m) => m.RouteApiMoviesModule),
      },
      {
        path: ApiRoute.Person,
        loadChildren: () =>
          import('src/app/module/widget/route-api/route-api-people/route-api-people.module').then((m) => m.RouteApiPeopleModule),
      },
      {
        path: ApiRoute.Species,
        loadChildren: () =>
          import('src/app/module/widget/route-api/route-api-species/route-api-species.module').then((m) => m.RouteApiSpeciesModule),
      },
      {
        path: ApiRoute.Vehicle,
        loadChildren: () =>
          import('src/app/module/widget/route-api/route-api-vehicles/route-api-vehicles.module').then((m) => m.RouteApiVehiclesModule),
      },
      {path: ROUTE_ROOT, redirectTo: ApiRoute.Movie, pathMatch: 'full'},
      {path: ROUTE_WILDCARD, redirectTo: ApiRoute.Movie},
    ],
  },
];

@NgModule({
  imports: [NavigationContentModule, RouterModule.forChild(ROUTING)],
  providers: [
    {
      provide: DiRemoteCurrentItemToId,
      useValue: (item: GhibliLocation | GhibliMovie | GhibliPerson | GhibliSpecies | GhibliVehicle) => item.id,
    },
  ],
})
class RouteApiModule {}

export {RouteApiModule};
