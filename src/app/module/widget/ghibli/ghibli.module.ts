import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {FlexboxModule} from '../../directive/flexbox';
import {LoadingBarModule} from '../loading-bar';
import {SimpleTableModule} from '../simple-table';
import {SimpleViewModule} from '../simple-view';
import {GhibliComponent} from './ghibli.component';

const ROUTING: Routes = [
  {path: ROUTE_ROOT, component: GhibliComponent, pathMatch: 'full'},
  {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT},
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    FlexboxModule,
    LoadingBarModule,
    SimpleTableModule,
    SimpleViewModule,
    RouterModule.forChild(ROUTING),
  ],
  exports: [GhibliComponent],
  declarations: [GhibliComponent],
})
class GhibliModule {}

export {GhibliModule, GhibliComponent};
