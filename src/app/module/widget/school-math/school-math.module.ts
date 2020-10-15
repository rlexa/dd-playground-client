import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {RouterModule} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {SimpleViewModule} from '../simple-view';
import {SchoolMathComponent} from './school-math.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, SimpleViewModule],
  exports: [SchoolMathComponent],
  declarations: [SchoolMathComponent],
})
class SchoolMathModule {}

@NgModule({
  imports: [
    SchoolMathModule,
    RouterModule.forChild([
      {path: ROUTE_ROOT, component: SchoolMathComponent, pathMatch: 'full'},
      {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT},
    ]),
  ],
})
class RoutedSchoolMathModule {}

export {RoutedSchoolMathModule, SchoolMathModule, SchoolMathComponent};
