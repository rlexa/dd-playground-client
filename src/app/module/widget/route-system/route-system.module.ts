import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {NavigationBarItem, NavigationBarItemsData} from '../navigation-bar';
import {NavigationContentComponent, NavigationContentModule} from '../navigation-content';
import {SystemRoute} from './system-route';

const routeNavs: Record<SystemRoute, NavigationBarItem> = {
  [SystemRoute.BuildConfig]: {icon: 'build_config', route: SystemRoute.BuildConfig, label: 'Build Settings'},
  [SystemRoute.Configuration]: {icon: 'configuration', route: SystemRoute.Configuration, label: 'Configuration'},
};

const data: NavigationBarItemsData = {
  navigationBarItems: Object.values(SystemRoute).map((ii) => routeNavs[ii]),
};

const ROUTING: Routes = [
  {
    path: ROUTE_ROOT,
    component: NavigationContentComponent,
    data,
    children: [
      {
        path: SystemRoute.Configuration,
        loadChildren: () => import('src/app/module/widget/config/config.module').then((m) => m.ConfigModule),
      },
      {path: SystemRoute.BuildConfig, loadChildren: () => import('src/app/module/widget/build/build.module').then((m) => m.BuildModule)},
      {path: ROUTE_ROOT, redirectTo: SystemRoute.Configuration, pathMatch: 'full'},
      {path: ROUTE_WILDCARD, redirectTo: SystemRoute.Configuration},
    ],
  },
];

@NgModule({imports: [NavigationContentModule, RouterModule.forChild(ROUTING)]})
class RouteSystemModule {}

export {RouteSystemModule};
