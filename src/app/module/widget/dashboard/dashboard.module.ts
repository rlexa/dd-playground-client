import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {FooterModule} from '../footer';
import {NavigationBarItem, NavigationBarItemsData, NavigationBarModule} from '../navigation-bar';
import {DashboardRoute} from './dashboard-route';
import {DashboardComponent} from './dashboard.component';

const routeNavs: Record<DashboardRoute, NavigationBarItem> = {
  [DashboardRoute.Crypto]: {icon: 'cryptocurrency', route: DashboardRoute.Crypto, label: 'Cryptocurrency'},
  [DashboardRoute.Game]: {icon: 'game', route: DashboardRoute.Game, label: 'Game'},
  [DashboardRoute.Graph]: {icon: 'graph', route: DashboardRoute.Graph, label: 'Graph'},
  [DashboardRoute.Overview]: {icon: 'overview', route: DashboardRoute.Overview, label: 'Overview'},
  [DashboardRoute.Playground]: {icon: 'playground', route: DashboardRoute.Playground, label: 'Demo'},
  [DashboardRoute.School]: {icon: 'school', route: DashboardRoute.School, label: 'School'},
  [DashboardRoute.Settings]: {icon: 'settings', route: DashboardRoute.Settings, label: 'Settings'},
};

const data: NavigationBarItemsData = {
  navigationBarItems: Object.values(DashboardRoute).map((ii) => routeNavs[ii]),
};

const ROUTING: Routes = [
  {
    path: ROUTE_ROOT,
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
      {
        path: DashboardRoute.School,
        loadChildren: () => import('src/app/module/widget/route-school/route-school.module').then((m) => m.RouteSchoolModule),
      },
      {
        path: DashboardRoute.Playground,
        loadChildren: () => import('src/app/module/widget/route-playground/route-playground.module').then((m) => m.RoutePlaygroundModule),
      },
      {
        path: DashboardRoute.Settings,
        loadChildren: () => import('src/app/module/widget/route-system/route-system.module').then((m) => m.RouteSystemModule),
      },
      {path: ROUTE_ROOT, redirectTo: DashboardRoute.Overview, pathMatch: 'full'},
      {path: ROUTE_WILDCARD, redirectTo: DashboardRoute.Overview},
    ],
  },
];

@NgModule({
  imports: [CommonModule, FooterModule, NavigationBarModule, RouterModule.forChild(ROUTING)],
  exports: [DashboardComponent],
  declarations: [DashboardComponent],
})
class DashboardModule {}

export {DashboardModule, DashboardComponent};
