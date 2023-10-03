import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SimpleViewComponent} from '../../simple-view';
import {GhiblLinkModule} from '../ghibli-link';
import {GhibliItemDetailComponent} from './ghibli-item-detail.component';

@NgModule({
  declarations: [GhibliItemDetailComponent],
  imports: [CommonModule, GhiblLinkModule, SimpleViewComponent],
  exports: [GhibliItemDetailComponent],
})
class GhibliItemDetailModule {}

export {GhibliItemDetailComponent, GhibliItemDetailModule};
