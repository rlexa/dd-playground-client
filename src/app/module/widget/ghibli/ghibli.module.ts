import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {FlexboxDirective} from '../../directive/flexbox';
import {LoadingBarModule} from '../loading-bar';
import {SimpleTableComponent} from '../simple-table';
import {SimpleViewComponent} from '../simple-view';
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
    FlexboxDirective,
    LoadingBarModule,
    SimpleTableComponent,
    SimpleViewComponent,
    RouterModule.forChild(ROUTING),
  ],
  exports: [GhibliComponent],
  declarations: [GhibliComponent],
})
class GhibliModule {}

export {GhibliComponent, GhibliModule};
