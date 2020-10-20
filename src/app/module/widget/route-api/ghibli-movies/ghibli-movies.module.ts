import {ScrollingModule} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {RouterModule} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {routeParamIdMovie} from '../api-route';
import {GhibliMoviesComponent} from './ghibli-movies.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    ScrollingModule,
    RouterModule.forChild([
      {
        path: ROUTE_ROOT,
        component: GhibliMoviesComponent,
        children: [
          {
            path: `:${routeParamIdMovie}`,
            loadChildren: () =>
              import('src/app/module/widget/route-api/ghibli-movies/ghibli-movie/routed-ghibli-movie.module').then(
                (m) => m.RoutedGhibliMovieModule,
              ),
          },
          {
            path: ROUTE_ROOT,
            loadChildren: () =>
              import('src/app/module/widget/route-api/ghibli-movies/ghibli-movie/routed-ghibli-movie.module').then(
                (m) => m.RoutedGhibliMovieModule,
              ),
            pathMatch: 'full',
          },
          {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT},
        ],
      },
      {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT},
    ]),
  ],
  exports: [GhibliMoviesComponent],
  declarations: [GhibliMoviesComponent],
})
class GhibliMoviesModule {}

export {GhibliMoviesModule, GhibliMoviesComponent};
