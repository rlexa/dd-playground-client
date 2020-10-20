import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {GhibliMovieAutowireDirective} from './ghibli-movie-autowire.directive';
import {GhibliMovieModule} from './ghibli-movie.module';
import {RoutedGhibliMovieComponent} from './routed-ghibli-movie.component';

@NgModule({
  declarations: [RoutedGhibliMovieComponent, GhibliMovieAutowireDirective],
  imports: [
    GhibliMovieModule,
    RouterModule.forChild([
      {path: ROUTE_ROOT, component: RoutedGhibliMovieComponent, pathMatch: 'full'},
      {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT},
    ]),
  ],
})
class RoutedGhibliMovieModule {}

export {RoutedGhibliMovieModule};
