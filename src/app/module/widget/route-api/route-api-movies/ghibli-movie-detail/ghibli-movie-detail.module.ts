import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RouterModule} from '@angular/router';
import {FlatPipeModule} from 'src/app/module/pipe/flat';
import {IconPipeModule} from 'src/app/module/pipe/icon';
import {SimpleViewModule} from '../../../simple-view';
import {ApiPipesModule} from '../../api-pipes/api-pipes.module';
import {GhiblLinkModule} from '../../ghibli-link';
import {GhibliMovieDetailComponent} from './ghibli-movie-detail.component';
import {RoutedGhibliMovieDetailComponent} from './routed-ghibli-movie-detail.component';

@NgModule({
  declarations: [GhibliMovieDetailComponent, RoutedGhibliMovieDetailComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatTooltipModule,
    FlatPipeModule,
    IconPipeModule,
    ApiPipesModule,
    GhiblLinkModule,
    SimpleViewModule,
  ],
  exports: [GhibliMovieDetailComponent, RoutedGhibliMovieDetailComponent],
})
class GhibliMovieDetailModule {}

export {GhibliMovieDetailModule, GhibliMovieDetailComponent, RoutedGhibliMovieDetailComponent};
