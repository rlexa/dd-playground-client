import {Route} from '@angular/router';
import {RouteDemoGhibli, RouteDemoMisc, RouteRoot, RouteWild} from 'src/app/routing';
import {NavigationBarItem, NavigationBarItemsData} from '../../widget/navigation-bar';

const routeNavs: Record<string, NavigationBarItem> = {
  [RouteDemoMisc]: {icon: 'items1', route: RouteDemoMisc, label: 'Misc.'},
  [RouteDemoGhibli]: {icon: 'items2', route: RouteDemoGhibli, label: 'Ghibli'},
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
      {path: RouteDemoMisc, loadChildren: () => import('../../feature/demo-misc/routes')},
      {path: RouteRoot, redirectTo: RouteDemoMisc, pathMatch: 'full'},
      {path: RouteWild, redirectTo: RouteDemoMisc},
    ],
  },
] as Route[];
