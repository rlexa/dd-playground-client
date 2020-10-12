import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RouterModule} from '@angular/router';
import {IconPipeModule} from '../../pipe/icon';
import {NavigationBarComponent, NavigationBarItem} from './navigation-bar.component';

@NgModule({
  imports: [CommonModule, RouterModule, MatButtonModule, MatToolbarModule, MatTooltipModule, IconPipeModule],
  exports: [NavigationBarComponent],
  declarations: [NavigationBarComponent],
})
class NavigationBarModule {}

export {NavigationBarModule, NavigationBarComponent, NavigationBarItem};
