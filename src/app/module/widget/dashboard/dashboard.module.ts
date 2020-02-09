import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutedContentComponent } from 'app/module/widget/routed-content';
import { ROUTE_AI, ROUTE_APPROXPOLYNOM, ROUTE_BLOCKCHAIN, ROUTE_BUILDCONFIG, ROUTE_CONFIGURATION, ROUTE_CRYPTO, ROUTE_CURRENT, ROUTE_DEMO_GHIBLI, ROUTE_DEMO_MISC, ROUTE_DEMO_STATE, ROUTE_GAME, ROUTE_GAME_DOWN, ROUTE_GRAPH, ROUTE_OVERVIEW, ROUTE_PLAYGROUND, ROUTE_RENDER_CANVAS, ROUTE_ROOT, ROUTE_SETTINGS, ROUTE_WILDCARD } from 'app/routing';
import { DashboardComponent } from './dashboard.component';
import { imports } from './imports';

const ROUTING = <Routes>[
  {
    path: ROUTE_ROOT, component: DashboardComponent, children: [
      {
        path: ROUTE_OVERVIEW, component: RoutedContentComponent,
        children: [
          { path: ROUTE_CURRENT, loadChildren: () => import('app/module/widget/overview/overview.module').then(m => m.OverviewModule) },
          { path: ROUTE_ROOT, redirectTo: ROUTE_CURRENT, pathMatch: 'full' },
          { path: ROUTE_WILDCARD, redirectTo: ROUTE_CURRENT, pathMatch: 'full' },
        ]
      },
      {
        path: ROUTE_GAME,
        component: RoutedContentComponent,
        children: [
          { path: ROUTE_GAME_DOWN, loadChildren: () => import('app/module/widget/game-down/game-down.module').then(m => m.GameDownModule) },
          { path: ROUTE_RENDER_CANVAS, loadChildren: () => import('app/module/widget/render-canvas/render-canvas.module').then(m => m.RenderCanvasModule) },
          { path: ROUTE_ROOT, redirectTo: ROUTE_GAME_DOWN, pathMatch: 'full' },
          { path: ROUTE_WILDCARD, redirectTo: ROUTE_GAME_DOWN, pathMatch: 'full' },
        ]
      },
      { path: ROUTE_GRAPH, loadChildren: () => import('app/module/widget/graph-top-level/graph-top-level.module').then(m => m.GraphTopLevelModule) },
      {
        path: ROUTE_AI,
        component: RoutedContentComponent,
        children: [
          { path: ROUTE_APPROXPOLYNOM, loadChildren: () => import('app/module/widget/ml-polynomial/ml-polynomial.module').then(m => m.MlPolynomialModule) },
          { path: ROUTE_ROOT, redirectTo: ROUTE_APPROXPOLYNOM, pathMatch: 'full' },
          { path: ROUTE_WILDCARD, redirectTo: ROUTE_APPROXPOLYNOM, pathMatch: 'full' },
        ]
      },
      {
        path: ROUTE_CRYPTO,
        component: RoutedContentComponent,
        children: [
          { path: ROUTE_BLOCKCHAIN, loadChildren: () => import('app/module/widget/crypto/crypto.module').then(m => m.CryptoModule) },
          { path: ROUTE_ROOT, redirectTo: ROUTE_BLOCKCHAIN, pathMatch: 'full' },
          { path: ROUTE_WILDCARD, redirectTo: ROUTE_BLOCKCHAIN, pathMatch: 'full' },
        ]
      },
      {
        path: ROUTE_PLAYGROUND,
        component: RoutedContentComponent,
        children: [
          { path: ROUTE_DEMO_MISC, loadChildren: () => import('app/module/widget/demo-misc/demo-misc.module').then(m => m.DemoMiscModule) },
          { path: ROUTE_DEMO_STATE, loadChildren: () => import('app/module/widget/demo-state/demo-state.module').then(m => m.DemoStateModule) },
          { path: ROUTE_DEMO_GHIBLI, loadChildren: () => import('app/module/widget/ghibli/ghibli.module').then(m => m.GhibliModule) },
          { path: ROUTE_ROOT, redirectTo: ROUTE_DEMO_MISC, pathMatch: 'full' },
          { path: ROUTE_WILDCARD, redirectTo: ROUTE_DEMO_MISC, pathMatch: 'full' },
        ]
      },
      {
        path: ROUTE_SETTINGS,
        component: RoutedContentComponent,
        children: [
          { path: ROUTE_CONFIGURATION, loadChildren: () => import('app/module/widget/config/config.module').then(m => m.ConfigModule) },
          { path: ROUTE_BUILDCONFIG, loadChildren: () => import('app/module/widget/build/build.module').then(m => m.BuildModule) },
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
