import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  ROUTE_CRYPTO,
  ROUTE_GAME,
  ROUTE_GRAPH,
  ROUTE_OVERVIEW,
  ROUTE_PLAYGROUND,
  ROUTE_ROOT,
  ROUTE_SCHOOL,
  ROUTE_SETTINGS,
  ROUTE_WILDCARD,
} from 'src/app/routing';
import {FooterModule} from '../footer';
import {NavigationBarModule} from '../navigation-bar';
import {DashboardComponent, DashboardComponentRouteData} from './dashboard.component';

const data: DashboardComponentRouteData = {
  navs: [
    {icon: 'overview', route: ROUTE_OVERVIEW, label: 'Overview'},
    {icon: 'graph', route: ROUTE_GRAPH, label: 'Graph'},
    {icon: 'cryptocurrency', route: ROUTE_CRYPTO, label: 'Cryptocurrency'},
    {icon: 'school', route: ROUTE_SCHOOL, label: 'School'},
    {icon: 'game', route: ROUTE_GAME, label: 'Game'},
    {icon: 'playground', route: ROUTE_PLAYGROUND, label: 'Demo'},
    {icon: 'settings', route: ROUTE_SETTINGS, label: 'Settings'},
  ],
};

const ROUTING: Routes = [
  {
    path: ROUTE_ROOT,
    component: DashboardComponent,
    data,
    children: [
      {
        path: ROUTE_OVERVIEW,
        loadChildren: () => import('src/app/module/widget/route-overview/route-overview.module').then((m) => m.RouteOverviewModule),
      },
      {
        path: ROUTE_GAME,
        loadChildren: () => import('src/app/module/widget/route-game/route-game.module').then((m) => m.RouteGameModule),
      },
      {
        path: ROUTE_GRAPH,
        loadChildren: () => import('src/app/module/widget/graph-top-level/graph-top-level.module').then((m) => m.GraphTopLevelModule),
      },
      {
        path: ROUTE_CRYPTO,
        loadChildren: () => import('src/app/module/widget/route-crypto/route-crypto.module').then((m) => m.RouteCryptoModule),
      },
      {
        path: ROUTE_SCHOOL,
        loadChildren: () => import('src/app/module/widget/route-school/route-school.module').then((m) => m.RouteSchoolModule),
      },
      {
        path: ROUTE_PLAYGROUND,
        loadChildren: () => import('src/app/module/widget/route-playground/route-playground.module').then((m) => m.RoutePlaygroundModule),
      },
      {
        path: ROUTE_SETTINGS,
        loadChildren: () => import('src/app/module/widget/route-system/route-system.module').then((m) => m.RouteSystemModule),
      },
      {path: ROUTE_ROOT, redirectTo: ROUTE_OVERVIEW},
      {path: ROUTE_WILDCARD, redirectTo: ROUTE_OVERVIEW, pathMatch: 'full'},
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
