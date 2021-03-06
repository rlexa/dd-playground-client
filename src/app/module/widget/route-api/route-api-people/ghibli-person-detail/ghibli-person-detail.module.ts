import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlatPipeModule} from 'src/app/module/pipe/flat';
import {ApiPipesModule} from '../../api-pipes/api-pipes.module';
import {GhibliItemDetailModule} from '../../ghibli-item-detail';
import {RoutedGhibliPersonDetailComponent} from './routed-ghibli-person-detail.component';

@NgModule({
  declarations: [RoutedGhibliPersonDetailComponent],
  imports: [CommonModule, FlatPipeModule, ApiPipesModule, GhibliItemDetailModule],
  exports: [RoutedGhibliPersonDetailComponent],
})
class GhibliPersonDetailModule {}

export {GhibliPersonDetailModule, RoutedGhibliPersonDetailComponent};
