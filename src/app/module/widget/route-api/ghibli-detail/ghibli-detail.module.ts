import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SimpleViewModule} from '../../simple-view';
import {GhibliDetailComponent} from './ghibli-detail.component';

@NgModule({
  declarations: [GhibliDetailComponent],
  imports: [CommonModule, SimpleViewModule],
  exports: [GhibliDetailComponent],
})
class GhibliDetailModule {}

export {GhibliDetailModule, GhibliDetailComponent};
