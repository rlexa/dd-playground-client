import {ScrollingModule} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {RouterModule} from '@angular/router';
import {ItemToTitlePipe} from './ghibli-item-title.pipe';
import {ItemsSortByPipe} from './ghibli-items-sort-by.pipe';
import {GhibliListDetailComponent} from './ghibli-list-detail.component';

@NgModule({
  declarations: [GhibliListDetailComponent, ItemsSortByPipe, ItemToTitlePipe],
  imports: [CommonModule, RouterModule, MatListModule, ScrollingModule],
})
class GhibliListDetailModule {}

export {GhibliListDetailModule};
