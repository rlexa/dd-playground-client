import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlatPipeModule} from 'src/app/module/pipe/flat';
import {ApiPipesModule} from '../../api-pipes/api-pipes.module';
import {GhibliItemDetailModule} from '../../ghibli-item-detail';
import {RoutedGhibliMovieDetailComponent} from './routed-ghibli-movie-detail.component';

@NgModule({
  declarations: [RoutedGhibliMovieDetailComponent],
  imports: [CommonModule, FlatPipeModule, ApiPipesModule, GhibliItemDetailModule],
  exports: [RoutedGhibliMovieDetailComponent],
})
class GhibliMovieDetailModule {}

export {GhibliMovieDetailModule, RoutedGhibliMovieDetailComponent};
