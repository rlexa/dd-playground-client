import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {FlexboxDirective} from '../../directive/flexbox';
import {OverviewComponent} from './overview.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatCardModule, MatListModule, FlexboxDirective],
  exports: [OverviewComponent],
  declarations: [OverviewComponent],
})
class OverviewModule {}

export {OverviewComponent, OverviewModule};
