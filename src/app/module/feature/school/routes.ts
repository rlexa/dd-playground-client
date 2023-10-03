import {Route} from '@angular/router';
import {RouteMath, RouteRoot, RouteWild} from 'src/app/routing';
import {NavigationBarItem, NavigationBarItemsData} from '../../widget/navigation-bar';

const routeNavs: Record<string, NavigationBarItem> = {
  [RouteMath]: {icon: 'items1', route: RouteMath, label: 'Math'},
};

const data: NavigationBarItemsData = {
  navigationBarItems: Object.values(routeNavs),
};

export default [
  {
    path: RouteRoot,
    loadComponent: () => import('../../widget/navigation-content').then((ii) => ii.NavigationContentComponent),
    data,
    children: [
      {path: RouteMath, loadChildren: () => import('../school-math/routes')},
      {path: RouteRoot, redirectTo: RouteMath, pathMatch: 'full'},
      {path: RouteWild, redirectTo: RouteMath},
    ],
  },
] as Route[];
