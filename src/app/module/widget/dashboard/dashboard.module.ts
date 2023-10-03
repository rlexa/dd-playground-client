import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteRoot, RouteWild} from 'src/app/routing';
import {FooterModule} from '../footer';
import {NavigationBarItem, NavigationBarItemsData, NavigationBarModule} from '../navigation-bar';
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
      {
        path: DashboardRoute.Overview,
        loadChildren: () => import('src/app/module/widget/route-overview/route-overview.module').then((m) => m.RouteOverviewModule),
      },
      {
        path: DashboardRoute.Game,
        loadChildren: () => import('src/app/module/widget/route-game/route-game.module').then((m) => m.RouteGameModule),
      },
      {
        path: DashboardRoute.Graph,
        loadChildren: () => import('src/app/module/widget/graph-top-level/graph-top-level.module').then((m) => m.GraphTopLevelModule),
      },
      {
        path: DashboardRoute.Crypto,
        loadChildren: () => import('src/app/module/widget/route-crypto/route-crypto.module').then((m) => m.RouteCryptoModule),
      },
      {path: DashboardRoute.School, loadChildren: () => import('../../feature/school/routes')},
      {
        path: DashboardRoute.Playground,
        loadChildren: () => import('src/app/module/widget/route-playground/route-playground.module').then((m) => m.RoutePlaygroundModule),
      },
      {
        path: DashboardRoute.Api,
        loadChildren: () => import('src/app/module/widget/route-api/route-api.module').then((m) => m.RouteApiModule),
      },
      {path: DashboardRoute.Settings, loadChildren: () => import('src/app/module/feature/system/routes')},
      {path: RouteRoot, redirectTo: DashboardRoute.Overview, pathMatch: 'full'},
      {path: RouteWild, redirectTo: DashboardRoute.Overview},
    ],
  },
];

@NgModule({
  imports: [CommonModule, FooterModule, NavigationBarModule, RouterModule.forChild(ROUTING)],
  exports: [DashboardComponent],
  declarations: [DashboardComponent],
})
class DashboardModule {}

export {DashboardComponent, DashboardModule};
