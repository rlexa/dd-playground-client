import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {FlexboxDirective} from '../../directive/flexbox';
import {IconPipe} from '../../pipe/icon';
import {RipupperPipe} from '../../pipe/ripupper';
import {StartuppercasePipe} from '../../pipe/startuppercase';
import {SimpleViewComponent} from './simple-view.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatListModule, FlexboxDirective, IconPipe, RipupperPipe, StartuppercasePipe],
  exports: [SimpleViewComponent],
  declarations: [SimpleViewComponent],
})
class SimpleViewModule {}

export {SimpleViewComponent, SimpleViewModule};
