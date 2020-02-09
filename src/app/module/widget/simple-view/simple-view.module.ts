import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {FlexboxModule} from '../../directive/flexbox';
import {IconPipeModule} from '../../pipe/icon';
import {RipupperPipeModule} from '../../pipe/ripupper';
import {StartuppercasePipeModule} from '../../pipe/startuppercase';
import {SimpleViewComponent} from './simple-view.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatListModule, FlexboxModule, IconPipeModule, RipupperPipeModule, StartuppercasePipeModule],
  exports: [SimpleViewComponent],
  declarations: [SimpleViewComponent],
})
class SimpleViewModule {}

export {SimpleViewModule, SimpleViewComponent};
