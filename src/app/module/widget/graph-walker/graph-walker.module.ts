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
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {FlexboxModule} from '../../directive/flexbox';
import {IconPipeModule} from '../../pipe/icon';
import {SimpleViewModule} from '../simple-view';
import {GraphWalkerComponent, TAG_TYPE} from './graph-walker.component';

const ROUTING: Routes = [
  {path: ROUTE_ROOT, component: GraphWalkerComponent, pathMatch: 'full'},
  {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT},
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
    FlexboxModule,
    IconPipeModule,
    SimpleViewModule,
    RouterModule.forChild(ROUTING),
  ],
  exports: [GraphWalkerComponent],
  declarations: [GraphWalkerComponent],
})
class GraphWalkerModule {}

export {GraphWalkerModule, GraphWalkerComponent, TAG_TYPE};
