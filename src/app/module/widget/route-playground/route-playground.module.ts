import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_DEMO_GHIBLI, ROUTE_DEMO_MISC, ROUTE_DEMO_STATE, ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {NavigationContentComponent, NavigationContentComponentRouteData, NavigationContentModule} from '../navigation-content';

const data: NavigationContentComponentRouteData = {
  navs: [
    {icon: 'items1', route: ROUTE_DEMO_MISC, label: 'Misc.'},
    {icon: 'items2', route: ROUTE_DEMO_STATE, label: 'State'},
    {icon: 'items3', route: ROUTE_DEMO_GHIBLI, label: 'Ghibli'},
  ],
};

const ROUTING: Routes = [
  {
    path: ROUTE_ROOT,
    component: NavigationContentComponent,
    data,
    children: [
      {
        path: ROUTE_DEMO_MISC,
        loadChildren: () => import('src/app/module/widget/demo-misc/demo-misc.module').then((m) => m.DemoMiscModule),
      },
      {
        path: ROUTE_DEMO_STATE,
        loadChildren: () => import('src/app/module/widget/demo-state/demo-state.module').then((m) => m.DemoStateModule),
      },
      {path: ROUTE_DEMO_GHIBLI, loadChildren: () => import('src/app/module/widget/ghibli/ghibli.module').then((m) => m.GhibliModule)},
      {path: ROUTE_ROOT, redirectTo: ROUTE_DEMO_MISC},
      {path: ROUTE_WILDCARD, redirectTo: ROUTE_DEMO_MISC, pathMatch: 'full'},
    ],
  },
];

@NgModule({imports: [NavigationContentModule, RouterModule.forChild(ROUTING)]})
class RoutePlaygroundModule {}

export {RoutePlaygroundModule};
