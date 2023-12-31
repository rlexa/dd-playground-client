import {Route} from '@angular/router';
import {RouteRoot, RouteWild} from 'src/app/routing';
import {NavigationBarItem, NavigationBarItemsData} from '../navigation-bar';
import {DashboardRoute} from './dashboard-route';
import {DashboardComponent} from './dashboard.component';

const routeNavs: Record<DashboardRoute, Omit<NavigationBarItem, 'route'>> = {
  [DashboardRoute.Crypto]: {icon: 'cryptocurrency', label: 'Cryptocurrency'},
  [DashboardRoute.Game]: {icon: 'game', label: 'Game'},
  [DashboardRoute.Graph]: {icon: 'graph', label: 'Graph'},
  [DashboardRoute.Overview]: {icon: 'overview', label: 'Overview'},
  [DashboardRoute.Playground]: {icon: 'playground', label: 'Demo'},
  [DashboardRoute.School]: {icon: 'school', label: 'School'},
  [DashboardRoute.Settings]: {icon: 'settings', label: 'Settings'},
};

const data: NavigationBarItemsData = {
  navigationBarItems: Object.values(DashboardRoute).map<NavigationBarItem>((ii) => ({...routeNavs[ii], route: ii})),
};

export default [
  {
    path: RouteRoot,
    component: DashboardComponent,
    data,
    children: [
      {path: DashboardRoute.Overview, loadChildren: () => import('../../feature/overview/routes')},
      {path: DashboardRoute.Game, loadChildren: () => import('../../feature/game/routes')},
      {path: DashboardRoute.Graph, loadChildren: () => import('../../widget/graph-top-level/routes')},
      {path: DashboardRoute.Crypto, loadChildren: () => import('../../feature/crypto/routes')},
      {path: DashboardRoute.School, loadChildren: () => import('../../feature/school/routes')},
      {path: DashboardRoute.Playground, loadChildren: () => import('../../feature/playground/routes')},
      {path: DashboardRoute.Settings, loadChildren: () => import('../../feature/system/routes')},
      {path: RouteRoot, redirectTo: DashboardRoute.Overview, pathMatch: 'full'},
      {path: RouteWild, redirectTo: DashboardRoute.Overview},
    ],
  },
] as Route[];
