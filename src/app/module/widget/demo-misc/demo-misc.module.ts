import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {FlexboxModule} from '../../directive/flexbox';
import {SimpleViewModule} from '../simple-view';
import {DemoMiscComponent} from './demo-misc.component';

const ROUTING: Routes = [
  {path: ROUTE_ROOT, component: DemoMiscComponent, pathMatch: 'full'},
  {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT},
];

@NgModule({
  imports: [CommonModule, MatButtonModule, MatCardModule, FlexboxModule, SimpleViewModule, RouterModule.forChild(ROUTING)],
  exports: [DemoMiscComponent],
  declarations: [DemoMiscComponent],
})
class DemoMiscModule {}

export {DemoMiscModule, DemoMiscComponent};
