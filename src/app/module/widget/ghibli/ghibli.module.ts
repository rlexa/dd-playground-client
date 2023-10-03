import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {RouterModule, Routes} from '@angular/router';
import {RouteRoot, RouteWild} from 'src/app/routing';
import {FlexboxDirective} from '../../directive/flexbox';
import {LoadingBarComponent} from '../loading-bar';
import {SimpleTableComponent} from '../simple-table';
import {SimpleViewComponent} from '../simple-view';
import {GhibliComponent} from './ghibli.component';

const ROUTING: Routes = [
  {path: RouteRoot, component: GhibliComponent, pathMatch: 'full'},
  {path: RouteWild, redirectTo: RouteRoot},
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    FlexboxDirective,
    LoadingBarComponent,
    SimpleTableComponent,
    SimpleViewComponent,
    RouterModule.forChild(ROUTING),
  ],
  exports: [GhibliComponent],
  declarations: [GhibliComponent],
})
class GhibliModule {}

export {GhibliComponent, GhibliModule};
