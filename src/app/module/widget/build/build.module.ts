import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {SimpleViewModule} from '../simple-view';
import {BuildComponent} from './build.component';

const ROUTING: Routes = [
  {path: ROUTE_ROOT, component: BuildComponent, pathMatch: 'full'},
  {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT},
];

@NgModule({
  imports: [CommonModule, MatCardModule, SimpleViewModule, RouterModule.forChild(ROUTING)],
  exports: [BuildComponent],
  declarations: [BuildComponent],
})
class BuildModule {}

export {BuildModule, BuildComponent};
