import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {SimpleViewModule} from '../../../simple-view';
import {GhibliMovieComponent} from './ghibli-movie.component';

@NgModule({
  declarations: [GhibliMovieComponent],
  imports: [CommonModule, MatCardModule, SimpleViewModule],
  exports: [GhibliMovieComponent],
})
class GhibliMovieModule {}

export {GhibliMovieModule, GhibliMovieComponent};
