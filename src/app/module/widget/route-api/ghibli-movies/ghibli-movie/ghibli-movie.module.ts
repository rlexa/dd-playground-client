import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {GhibliMovieComponent} from './ghibli-movie.component';

@NgModule({
  imports: [CommonModule, MatCardModule],
  exports: [GhibliMovieComponent],
  declarations: [GhibliMovieComponent],
})
class GhibliMovieModule {}

@NgModule({
  imports: [
    GhibliMovieModule,
    RouterModule.forChild([
      {path: ROUTE_ROOT, component: GhibliMovieComponent, pathMatch: 'full'},
      {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT},
    ]),
  ],
})
class RoutedGhibliMovieModule {}

export {GhibliMovieModule, GhibliMovieComponent, RoutedGhibliMovieModule};
