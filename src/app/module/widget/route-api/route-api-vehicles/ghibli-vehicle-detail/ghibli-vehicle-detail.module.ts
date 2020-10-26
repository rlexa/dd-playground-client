import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlatPipeModule} from 'src/app/module/pipe/flat';
import {ApiPipesModule} from '../../api-pipes/api-pipes.module';
import {GhibliItemDetailModule} from '../../ghibli-item-detail';
import {RoutedGhibliVehicleDetailComponent} from './routed-ghibli-vehicle-detail.component';

@NgModule({
  declarations: [RoutedGhibliVehicleDetailComponent],
  imports: [CommonModule, FlatPipeModule, ApiPipesModule, GhibliItemDetailModule],
  exports: [RoutedGhibliVehicleDetailComponent],
})
class GhiblVehicleDetailModule {}

export {GhiblVehicleDetailModule, RoutedGhibliVehicleDetailComponent};
