import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {RouterModule, Routes} from '@angular/router';
import {RouteRoot, RouteWild} from 'src/app/routing';
import {FlexboxDirective} from '../../directive/flexbox';
import {IconPipe} from '../../pipe/icon';
import {SimpleViewComponent} from '../simple-view';
import {GraphWalkerComponent, TAG_TYPE} from './graph-walker.component';

const ROUTING: Routes = [
  {path: RouteRoot, component: GraphWalkerComponent, pathMatch: 'full'},
  {path: RouteWild, redirectTo: RouteRoot},
];

@NgModule({
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    FlexboxDirective,
    IconPipe,
    SimpleViewComponent,
    RouterModule.forChild(ROUTING),
  ],
  exports: [GraphWalkerComponent],
  declarations: [GraphWalkerComponent],
})
class GraphWalkerModule {}

export {GraphWalkerComponent, GraphWalkerModule, TAG_TYPE};
