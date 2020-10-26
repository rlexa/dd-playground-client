import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SimpleViewModule} from '../../simple-view';
import {GhiblLinkModule} from '../ghibli-link';
import {GhibliItemDetailComponent} from './ghibli-item-detail.component';

@NgModule({
  declarations: [GhibliItemDetailComponent],
  imports: [CommonModule, GhiblLinkModule, SimpleViewModule],
  exports: [GhibliItemDetailComponent],
})
class GhibliItemDetailModule {}

export {GhibliItemDetailModule, GhibliItemDetailComponent};
