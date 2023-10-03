import {Route} from '@angular/router';
import {RouteCurrent, RouteRoot, RouteWild} from 'src/app/routing';
import {NavigationBarItem, NavigationBarItemsData} from '../../widget/navigation-bar';
import {NavigationContentComponent} from '../../widget/navigation-content';

const routeNavs: Record<string, NavigationBarItem> = {
  [RouteCurrent]: {icon: 'current', route: RouteCurrent, label: 'Current'},
};

const data: NavigationBarItemsData = {
  navigationBarItems: Object.values(routeNavs),
};

export default [
  {
    path: RouteRoot,
    component: NavigationContentComponent,
    data,
    children: [
      {path: RouteCurrent, loadComponent: () => import('./overview.component').then((ii) => ii.OverviewComponent)},
      {path: RouteRoot, redirectTo: RouteCurrent, pathMatch: 'full'},
      {path: RouteWild, redirectTo: RouteCurrent},
    ],
  },
] as Route[];
