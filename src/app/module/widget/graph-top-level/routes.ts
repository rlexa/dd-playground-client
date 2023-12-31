import {Route} from '@angular/router';
import {RouteRoot, RouteWild} from 'src/app/routing';
import {NavigationBarItem, NavigationBarItemsData} from '../navigation-bar';
import {GraphRoute} from './graph-route';
import {GraphTopLevelComponent} from './graph-top-level.component';

const routeNavs: Record<GraphRoute, NavigationBarItem> = {
  [GraphRoute.Walker]: {icon: 'items1', route: GraphRoute.Walker, label: 'Walker'},
};

const data: NavigationBarItemsData = {
  navigationBarItems: Object.values(GraphRoute).map((ii) => routeNavs[ii]),
};

export default [
  {
    path: RouteRoot,
    component: GraphTopLevelComponent,
    data,
    children: [
      {path: GraphRoute.Walker, loadChildren: () => import('../../feature/graph-walker/routes')},
      {path: RouteRoot, redirectTo: GraphRoute.Walker, pathMatch: 'full'},
      {path: RouteWild, redirectTo: GraphRoute.Walker},
    ],
  },
] as Route[];
