import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTE_AI, ROUTE_APPROXPOLYNOM, ROUTE_BLOCKCHAIN, ROUTE_BUILDCONFIG, ROUTE_CONFIGURATION, ROUTE_CRYPTO, ROUTE_CURRENT, ROUTE_DEMO_GHIBLI, ROUTE_DEMO_MISC, ROUTE_DEMO_STATE, ROUTE_GAME, ROUTE_GAME_DOWN, ROUTE_GRAPH, ROUTE_OVERVIEW, ROUTE_PLAYGROUND, ROUTE_ROOT, ROUTE_SETTINGS, ROUTE_WALKER } from 'app/routing';
import { BuildComponent, ConfigComponent, CryptoComponent, DemoMiscComponent, DemoStateComponent, GameDownComponent, GhibliComponent, GraphTopLevelComponent, GraphWalkerComponent, MlPolynomialComponent, OverviewComponent, RoutedContentComponent } from 'app/widgets';
import { DashboardComponent } from './dashboard.component';
import { imports } from './imports';

const ROUTING = [
  {
    path: ROUTE_ROOT, component: DashboardComponent, children: [
      { path: ROUTE_ROOT, redirectTo: ROUTE_OVERVIEW, pathMatch: 'full' },
      {
        path: ROUTE_OVERVIEW,
        component: RoutedContentComponent,
        children: [
          { path: ROUTE_ROOT, redirectTo: ROUTE_CURRENT, pathMatch: 'full' },
          { path: ROUTE_CURRENT, children: [{ path: ROUTE_ROOT, component: OverviewComponent }] }
        ]
      },
      {
        path: ROUTE_GAME,
        component: RoutedContentComponent,
        children: [
          { path: ROUTE_ROOT, redirectTo: ROUTE_GAME_DOWN, pathMatch: 'full' },
          { path: ROUTE_GAME_DOWN, children: [{ path: ROUTE_ROOT, component: GameDownComponent }] }
        ]
      },
      {
        path: ROUTE_GRAPH,
        component: GraphTopLevelComponent,
        children: [
          { path: ROUTE_ROOT, redirectTo: ROUTE_WALKER, pathMatch: 'full' },
          { path: ROUTE_WALKER, children: [{ path: ROUTE_ROOT, component: GraphWalkerComponent }] }
        ]
      },
      {
        path: ROUTE_AI,
        component: RoutedContentComponent,
        children: [
          { path: ROUTE_ROOT, redirectTo: ROUTE_APPROXPOLYNOM, pathMatch: 'full' },
          { path: ROUTE_APPROXPOLYNOM, children: [{ path: ROUTE_ROOT, component: MlPolynomialComponent }] }
        ]
      },
      {
        path: ROUTE_CRYPTO,
        component: RoutedContentComponent,
        children: [
          { path: ROUTE_ROOT, redirectTo: ROUTE_BLOCKCHAIN, pathMatch: 'full' },
          { path: ROUTE_BLOCKCHAIN, children: [{ path: ROUTE_ROOT, component: CryptoComponent }] }
        ]
      },
      {
        path: ROUTE_PLAYGROUND,
        component: RoutedContentComponent,
        children: [
          { path: ROUTE_ROOT, redirectTo: ROUTE_DEMO_MISC, pathMatch: 'full' },
          { path: ROUTE_DEMO_MISC, children: [{ path: ROUTE_ROOT, component: DemoMiscComponent }] },
          { path: ROUTE_DEMO_STATE, children: [{ path: ROUTE_ROOT, component: DemoStateComponent }] },
          { path: ROUTE_DEMO_GHIBLI, children: [{ path: ROUTE_ROOT, component: GhibliComponent }] },
        ]
      },
      {
        path: ROUTE_SETTINGS,
        component: RoutedContentComponent,
        children: [
          { path: ROUTE_ROOT, redirectTo: ROUTE_CONFIGURATION, pathMatch: 'full' },
          { path: ROUTE_CONFIGURATION, children: [{ path: ROUTE_ROOT, component: ConfigComponent }] },
          { path: ROUTE_BUILDCONFIG, children: [{ path: ROUTE_ROOT, component: BuildComponent }] }
        ]
      }
    ],
  },
];

@NgModule({
  imports: [...imports, RouterModule.forChild(ROUTING)], exports: [DashboardComponent], declarations: [DashboardComponent]
})
export class DashboardModule { }
