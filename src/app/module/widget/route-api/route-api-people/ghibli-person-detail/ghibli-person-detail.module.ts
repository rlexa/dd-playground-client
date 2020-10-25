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
import {GhibliPersonDetailComponent} from './ghibli-person-detail.component';
import {RoutedGhibliPersonDetailComponent} from './routed-ghibli-person-detail.component';

@NgModule({
  declarations: [GhibliPersonDetailComponent, RoutedGhibliPersonDetailComponent],
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
  exports: [GhibliPersonDetailComponent, RoutedGhibliPersonDetailComponent],
})
class GhibliPersonDetailModule {}

export {GhibliPersonDetailModule, GhibliPersonDetailComponent, RoutedGhibliPersonDetailComponent};
