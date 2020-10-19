import {ScrollingModule} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {RouterModule} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {SimpleViewModule} from '../../simple-view';
import {GhibliMoviesComponent} from './ghibli-movies.component';

@NgModule({
  imports: [CommonModule, MatListModule, ScrollingModule, SimpleViewModule],
  exports: [GhibliMoviesComponent],
  declarations: [GhibliMoviesComponent],
})
class GhibliMoviesModule {}

@NgModule({
  imports: [
    GhibliMoviesModule,
    RouterModule.forChild([
      {path: ROUTE_ROOT, component: GhibliMoviesComponent, pathMatch: 'full'},
      {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT},
    ]),
  ],
})
class RoutedGhibliMoviesModule {}

export {GhibliMoviesModule, GhibliMoviesComponent, RoutedGhibliMoviesModule};
