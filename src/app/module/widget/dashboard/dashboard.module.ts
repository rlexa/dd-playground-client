import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteRoot, RouteWild} from 'src/app/routing';
import {FooterComponent} from '../footer';
import {NavigationBarComponent, NavigationBarItem, NavigationBarItemsData, NavigationBarItemsFromRouteDirective} from '../navigation-bar';
import {DashboardRoute} from './dashboard-route';
import {DashboardComponent} from './dashboard.component';

const routeNavs: Record<DashboardRoute, Omit<NavigationBarItem, 'route'>> = {
  [DashboardRoute.Api]: {icon: 'view_list', label: 'API'},
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

const ROUTING: Routes = [
  {
    path: RouteRoot,
    component: DashboardComponent,
    data,
    children: [
      {path: DashboardRoute.Overview, loadChildren: () => import('../../feature/overview/routes')},
      {path: DashboardRoute.Game, loadChildren: () => import('../../feature/game/routes')},
      {
        path: DashboardRoute.Graph,
        loadChildren: () => import('src/app/module/widget/graph-top-level/graph-top-level.module').then((m) => m.GraphTopLevelModule),
      },
      {path: DashboardRoute.Crypto, loadChildren: () => import('../../feature/crypto/routes')},
      {path: DashboardRoute.School, loadChildren: () => import('../../feature/school/routes')},
      {path: DashboardRoute.Playground, loadChildren: () => import('../../feature/playground/routes')},
      {
        path: DashboardRoute.Api,
        loadChildren: () => import('src/app/module/widget/route-api/route-api.module').then((m) => m.RouteApiModule),
      },
      {path: DashboardRoute.Settings, loadChildren: () => import('../../feature/system/routes')},
      {path: RouteRoot, redirectTo: DashboardRoute.Overview, pathMatch: 'full'},
      {path: RouteWild, redirectTo: DashboardRoute.Overview},
    ],
  },
];

@NgModule({
  imports: [CommonModule, FooterComponent, NavigationBarComponent, NavigationBarItemsFromRouteDirective, RouterModule.forChild(ROUTING)],
  exports: [DashboardComponent],
  declarations: [DashboardComponent],
})
class DashboardModule {}

export {DashboardComponent, DashboardModule};
