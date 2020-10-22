import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {NavigationBarItem, NavigationBarItemsData} from '../navigation-bar';
import {NavigationContentComponent, NavigationContentComponentData, NavigationContentModule} from '../navigation-content';
import {ApiRoute} from './api-route';

const routeNavs: Record<ApiRoute, NavigationBarItem> = {
  [ApiRoute.Location]: {icon: 'place', route: ApiRoute.Location, label: 'Location'},
  [ApiRoute.Movie]: {icon: 'movie', route: ApiRoute.Movie, label: 'Movie'},
  [ApiRoute.Person]: {icon: 'person', route: ApiRoute.Person, label: 'People'},
  [ApiRoute.Species]: {icon: 'pets', route: ApiRoute.Species, label: 'Species'},
  [ApiRoute.Vehicle]: {icon: 'airport_shuttle', route: ApiRoute.Vehicle, label: 'Vehicles'},
};

const data: NavigationBarItemsData & NavigationContentComponentData = {
  navigationBarItems: Object.values(ApiRoute).map((ii) => routeNavs[ii]),
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
        loadChildren: () => import('src/app/module/widget/ghibli/ghibli.module').then((m) => m.GhibliModule),
      },
      {path: ROUTE_ROOT, redirectTo: ApiRoute.Movie, pathMatch: 'full'},
      {path: ROUTE_WILDCARD, redirectTo: ApiRoute.Movie},
    ],
  },
];

@NgModule({imports: [NavigationContentModule, RouterModule.forChild(ROUTING)]})
class RouteApiModule {}

export {RouteApiModule};
