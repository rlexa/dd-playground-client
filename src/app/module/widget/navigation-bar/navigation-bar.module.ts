import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RouterModule} from '@angular/router';
import {IconPipe} from '../../pipe/icon';
import {NavigationBarItemsData, NavigationBarItemsFromRouteDirective} from './navigation-bar-items-from-route.directive';
import {NavigationBarComponent, NavigationBarItem} from './navigation-bar.component';

@NgModule({
  imports: [CommonModule, RouterModule, MatButtonModule, MatToolbarModule, MatTooltipModule, IconPipe],
  exports: [NavigationBarComponent, NavigationBarItemsFromRouteDirective],
  declarations: [NavigationBarComponent, NavigationBarItemsFromRouteDirective],
})
class NavigationBarModule {}

export {NavigationBarComponent, NavigationBarItem, NavigationBarItemsData, NavigationBarItemsFromRouteDirective, NavigationBarModule};
