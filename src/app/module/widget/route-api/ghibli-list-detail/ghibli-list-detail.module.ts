import {ScrollingModule} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {RouterModule} from '@angular/router';
import {ApiPipesModule} from '../api-pipes/api-pipes.module';
import {GhibliListDetailComponent} from './ghibli-list-detail.component';

@NgModule({
  declarations: [GhibliListDetailComponent],
  imports: [CommonModule, RouterModule, MatListModule, ScrollingModule, ApiPipesModule],
})
class GhibliListDetailModule {}

export {GhibliListDetailModule};
