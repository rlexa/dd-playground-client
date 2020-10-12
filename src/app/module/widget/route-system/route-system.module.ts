import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_BUILDCONFIG, ROUTE_CONFIGURATION, ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {NavigationContentComponent, NavigationContentComponentRouteData, NavigationContentModule} from '../navigation-content';

const data: NavigationContentComponentRouteData = {
  navs: [
    {icon: 'configuration', route: ROUTE_CONFIGURATION, label: 'Configuration'},
    {icon: 'build_config', route: ROUTE_BUILDCONFIG, label: 'Build Settings'},
  ],
};

const ROUTING: Routes = [
  {
    path: ROUTE_ROOT,
    component: NavigationContentComponent,
    data,
    children: [
      {path: ROUTE_CONFIGURATION, loadChildren: () => import('src/app/module/widget/config/config.module').then((m) => m.ConfigModule)},
      {path: ROUTE_BUILDCONFIG, loadChildren: () => import('src/app/module/widget/build/build.module').then((m) => m.BuildModule)},
      {path: ROUTE_ROOT, redirectTo: ROUTE_CONFIGURATION},
      {path: ROUTE_WILDCARD, redirectTo: ROUTE_CONFIGURATION, pathMatch: 'full'},
    ],
  },
];

@NgModule({imports: [NavigationContentModule, RouterModule.forChild(ROUTING)]})
class RouteSystemModule {}

export {RouteSystemModule};
