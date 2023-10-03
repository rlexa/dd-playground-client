import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {RouterModule, Routes} from '@angular/router';
import {RouteRoot, RouteWild} from 'src/app/routing';
import {SimpleViewComponent} from '../simple-view';
import {BuildComponent} from './build.component';

const ROUTING: Routes = [
  {path: RouteRoot, component: BuildComponent, pathMatch: 'full'},
  {path: RouteWild, redirectTo: RouteRoot},
];

@NgModule({
  imports: [CommonModule, MatCardModule, SimpleViewComponent, RouterModule.forChild(ROUTING)],
  exports: [BuildComponent],
  declarations: [BuildComponent],
})
class BuildModule {}

export {BuildComponent, BuildModule};
