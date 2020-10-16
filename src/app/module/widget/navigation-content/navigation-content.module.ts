import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NavigationBarModule} from '../navigation-bar';
import {NavigationContentComponent} from './navigation-content.component';

@NgModule({
  imports: [CommonModule, RouterModule, NavigationBarModule],
  exports: [NavigationContentComponent],
  declarations: [NavigationContentComponent],
})
class NavigationContentModule {}

export {NavigationContentModule, NavigationContentComponent};
