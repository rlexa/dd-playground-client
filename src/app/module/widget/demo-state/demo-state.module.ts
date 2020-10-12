import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {FlexboxModule} from '../../directive/flexbox';
import {SimpleViewModule} from '../simple-view';
import {DemoStateComponent} from './demo-state.component';

const ROUTING: Routes = [
  {path: ROUTE_ROOT, component: DemoStateComponent, pathMatch: 'full'},
  {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT},
];

@NgModule({
  imports: [CommonModule, MatCardModule, FlexboxModule, SimpleViewModule, RouterModule.forChild(ROUTING)],
  exports: [DemoStateComponent],
  declarations: [DemoStateComponent],
})
class DemoStateModule {}

export {DemoStateModule, DemoStateComponent};
