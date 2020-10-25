import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {GhibliMovie} from '../api-ghibli.service';
import {DiRemoteCurrentItemToTitle} from '../di-api-common';
import {DiRemoteCurrentItem} from '../ghibli-detail';
import {DiRemoteCurrentList, GhibliListDetailModule} from '../ghibli-list-detail';
import {GhibliListDetailComponent} from '../ghibli-list-detail/ghibli-list-detail.component';
import {routeParamIdMovie} from './api-movies-route';
import {DiRemoteGhibliMovies, DiRouteMovie, DiRouteMovieProvider} from './di-ghibli-movie';
import {GhibliMovieDetailModule, RoutedGhibliMovieDetailComponent} from './ghibli-movie-detail';

@NgModule({
  providers: [
    DiRouteMovieProvider,
    {provide: DiRemoteCurrentList, useExisting: DiRemoteGhibliMovies},
    {provide: DiRemoteCurrentItem, useExisting: DiRouteMovie},
    {provide: DiRemoteCurrentItemToTitle, useValue: (item: GhibliMovie) => item?.title},
  ],
  imports: [
    GhibliListDetailModule,
    GhibliMovieDetailModule,
    RouterModule.forChild([
      {
        path: ROUTE_ROOT,
        component: GhibliListDetailComponent,
        children: [
          {path: `:${routeParamIdMovie}`, component: RoutedGhibliMovieDetailComponent},
          {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT},
        ],
      },
      {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT},
    ]),
  ],
})
class RouteApiMoviesModule {}

export {RouteApiMoviesModule};
