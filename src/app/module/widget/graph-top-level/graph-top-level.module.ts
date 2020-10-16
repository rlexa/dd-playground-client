import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {NavigationBarItem, NavigationBarItemsData} from '../navigation-bar';
import {NavigationContentModule} from '../navigation-content';
import {GraphRoute} from './graph-route';
import {GraphTopLevelComponent} from './graph-top-level.component';

const routeNavs: Record<GraphRoute, NavigationBarItem> = {
  [GraphRoute.Walker]: {icon: 'items1', route: GraphRoute.Walker, label: 'Walker'},
};

const data: NavigationBarItemsData = {
  navigationBarItems: Object.values(GraphRoute).map((ii) => routeNavs[ii]),
};

const ROUTING: Routes = [
  {
    path: ROUTE_ROOT,
    component: GraphTopLevelComponent,
    data,
    children: [
      {
        path: GraphRoute.Walker,
        loadChildren: () => import('src/app/module/widget/graph-walker/graph-walker.module').then((m) => m.GraphWalkerModule),
      },
      {path: ROUTE_ROOT, redirectTo: GraphRoute.Walker, pathMatch: 'full'},
      {path: ROUTE_WILDCARD, redirectTo: GraphRoute.Walker},
    ],
  },
];

@NgModule({
  imports: [CommonModule, HttpClientModule, NavigationContentModule, RouterModule.forChild(ROUTING)],
  exports: [GraphTopLevelComponent],
  declarations: [GraphTopLevelComponent],
})
class GraphTopLevelModule {}

export {GraphTopLevelModule, GraphTopLevelComponent};
