import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutedContentComponent } from 'app/module/widget/routed-content';
import { ROUTE_AI, ROUTE_APPROXPOLYNOM, ROUTE_BUILDCONFIG, ROUTE_CONFIGURATION, ROUTE_CRYPTO, ROUTE_CURRENT, ROUTE_DEMO_GHIBLI, ROUTE_DEMO_MISC, ROUTE_DEMO_STATE, ROUTE_GAME, ROUTE_GAME_DOWN, ROUTE_GRAPH, ROUTE_OVERVIEW, ROUTE_PLAYGROUND, ROUTE_ROOT, ROUTE_SETTINGS, ROUTE_WILDCARD } from 'app/routing';
import { DashboardComponent } from './dashboard.component';
import { imports } from './imports';

const ROUTING = <Routes>[
  {
    path: ROUTE_ROOT, component: DashboardComponent, children: [
      {
        path: ROUTE_OVERVIEW, component: RoutedContentComponent,
        children: [
          { path: ROUTE_CURRENT, loadChildren: 'app/module/widget/overview/overview.module#OverviewModule' },
          { path: ROUTE_ROOT, redirectTo: ROUTE_CURRENT, pathMatch: 'full' },
          { path: ROUTE_WILDCARD, redirectTo: ROUTE_CURRENT, pathMatch: 'full' },
        ]
      },
      {
        path: ROUTE_GAME,
        component: RoutedContentComponent,
        children: [
          { path: ROUTE_GAME_DOWN, loadChildren: 'app/module/widget/game-down/game-down.module#GameDownModule' },
          { path: ROUTE_ROOT, redirectTo: ROUTE_GAME_DOWN, pathMatch: 'full' },
          { path: ROUTE_WILDCARD, redirectTo: ROUTE_GAME_DOWN, pathMatch: 'full' },
        ]
      },
      { path: ROUTE_GRAPH, loadChildren: 'app/module/widget/graph-top-level/graph-top-level.module#GraphTopLevelModule' },
      {
        path: ROUTE_AI,
        component: RoutedContentComponent,
        children: [
          { path: ROUTE_APPROXPOLYNOM, loadChildren: 'app/module/widget/ml-polynomial/ml-polynomial.module#MlPolynomialModule' },
          { path: ROUTE_ROOT, redirectTo: ROUTE_APPROXPOLYNOM, pathMatch: 'full' },
          { path: ROUTE_WILDCARD, redirectTo: ROUTE_APPROXPOLYNOM, pathMatch: 'full' },
        ]
      },
      {
        path: ROUTE_CRYPTO,
        component: RoutedContentComponent,
        children: [
          { path: ROUTE_CRYPTO, loadChildren: 'app/module/widget/crypto/crypto.module#CryptoModule' },
          { path: ROUTE_ROOT, redirectTo: ROUTE_CRYPTO, pathMatch: 'full' },
          { path: ROUTE_WILDCARD, redirectTo: ROUTE_CRYPTO, pathMatch: 'full' },
        ]
      },
      {
        path: ROUTE_PLAYGROUND,
        component: RoutedContentComponent,
        children: [
          { path: ROUTE_DEMO_MISC, loadChildren: 'app/module/widget/demo-misc/demo-misc.module#DemoMiscModule' },
          { path: ROUTE_DEMO_STATE, loadChildren: 'app/module/widget/demo-state/demo-state.module#DemoStateModule' },
          { path: ROUTE_DEMO_GHIBLI, loadChildren: 'app/module/widget/ghibli/ghibli.module#GhibliModule' },
          { path: ROUTE_ROOT, redirectTo: ROUTE_DEMO_MISC, pathMatch: 'full' },
          { path: ROUTE_WILDCARD, redirectTo: ROUTE_DEMO_MISC, pathMatch: 'full' },
        ]
      },
      {
        path: ROUTE_SETTINGS,
        component: RoutedContentComponent,
        children: [
          { path: ROUTE_CONFIGURATION, loadChildren: 'app/module/widget/config/config.module#ConfigModule' },
          { path: ROUTE_BUILDCONFIG, loadChildren: 'app/module/widget/build/build.module#BuildModule' },
          { path: ROUTE_ROOT, redirectTo: ROUTE_CONFIGURATION, pathMatch: 'full' },
        ]
      },
      { path: ROUTE_ROOT, redirectTo: ROUTE_OVERVIEW, pathMatch: 'full' },
      { path: ROUTE_WILDCARD, redirectTo: ROUTE_OVERVIEW, pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [...imports, RouterModule.forChild(ROUTING)], exports: [DashboardComponent], declarations: [DashboardComponent]
})
export class DashboardModule { }