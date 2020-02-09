import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WALKER, ROUTE_WILDCARD} from 'app/routing';
import {GraphTopLevelComponent} from './graph-top-level.component';
import {imports} from './imports';

const ROUTING: Routes = [
  {
    path: ROUTE_ROOT,
    component: GraphTopLevelComponent,
    children: [
      {path: ROUTE_WALKER, loadChildren: () => import('app/module/widget/graph-walker/graph-walker.module').then(m => m.GraphWalkerModule)},
      {path: ROUTE_ROOT, redirectTo: ROUTE_WALKER, pathMatch: 'full'},
      {path: ROUTE_WILDCARD, redirectTo: ROUTE_WALKER, pathMatch: 'full'},
    ],
  },
  {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT, pathMatch: 'full'},
];

@NgModule({
  imports: [...imports, RouterModule.forChild(ROUTING)],
  exports: [GraphTopLevelComponent],
  declarations: [GraphTopLevelComponent],
})
export class GraphTopLevelModule {}
