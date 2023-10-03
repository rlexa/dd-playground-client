import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlatPipe} from 'src/app/module/pipe/flat';
import {ApiPipesModule} from '../../api-pipes/api-pipes.module';
import {GhibliItemDetailModule} from '../../ghibli-item-detail';
import {RoutedGhibliLocationDetailComponent} from './routed-ghibli-location-detail.component';

@NgModule({
  declarations: [RoutedGhibliLocationDetailComponent],
  imports: [CommonModule, FlatPipe, ApiPipesModule, GhibliItemDetailModule],
  exports: [RoutedGhibliLocationDetailComponent],
})
class GhibliLocationDetailModule {}

export {GhibliLocationDetailModule, RoutedGhibliLocationDetailComponent};
