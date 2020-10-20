import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SimpleViewModule} from '../../../simple-view';
import {GhibliMovieComponent} from './ghibli-movie.component';

@NgModule({
  declarations: [GhibliMovieComponent],
  imports: [CommonModule, SimpleViewModule],
  exports: [GhibliMovieComponent],
})
class GhibliMovieModule {}

export {GhibliMovieModule, GhibliMovieComponent};
