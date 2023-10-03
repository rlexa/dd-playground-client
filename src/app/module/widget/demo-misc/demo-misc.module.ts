import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {RouterModule, Routes} from '@angular/router';
import {RouteRoot, RouteWild} from 'src/app/routing';
import {FlexboxDirective} from '../../directive/flexbox';
import {SimpleViewComponent} from '../simple-view';
import {DemoMiscComponent} from './demo-misc.component';

const ROUTING: Routes = [
  {path: RouteRoot, component: DemoMiscComponent, pathMatch: 'full'},
  {path: RouteWild, redirectTo: RouteRoot},
];

@NgModule({
  imports: [CommonModule, MatButtonModule, MatCardModule, FlexboxDirective, SimpleViewComponent, RouterModule.forChild(ROUTING)],
  exports: [DemoMiscComponent],
  declarations: [DemoMiscComponent],
})
class DemoMiscModule {}

export {DemoMiscComponent, DemoMiscModule};
