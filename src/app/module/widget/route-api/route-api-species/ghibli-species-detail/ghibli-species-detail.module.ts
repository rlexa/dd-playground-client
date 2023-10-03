import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlatPipe} from 'src/app/module/pipe/flat';
import {ApiPipesModule} from '../../api-pipes/api-pipes.module';
import {GhibliItemDetailModule} from '../../ghibli-item-detail';
import {RoutedGhibliSpeciesDetailComponent} from './routed-ghibli-species-detail.component';

@NgModule({
  declarations: [RoutedGhibliSpeciesDetailComponent],
  imports: [CommonModule, FlatPipe, ApiPipesModule, GhibliItemDetailModule],
  exports: [RoutedGhibliSpeciesDetailComponent],
})
class GhibliSpeciesDetailModule {}

export {GhibliSpeciesDetailModule, RoutedGhibliSpeciesDetailComponent};
