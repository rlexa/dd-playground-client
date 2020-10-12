import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {SimpleViewModule} from '../simple-view';
import {SchoolMathComponent} from './school-math.component';

const ROUTING: Routes = [
  {path: ROUTE_ROOT, component: SchoolMathComponent, pathMatch: 'full'},
  {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT},
];

@NgModule({
  imports: [CommonModule, MatButtonModule, MatCardModule, SimpleViewModule, RouterModule.forChild(ROUTING)],
  exports: [SchoolMathComponent],
  declarations: [SchoolMathComponent],
})
class SchoolMathModule {}

export {SchoolMathModule, SchoolMathComponent};
