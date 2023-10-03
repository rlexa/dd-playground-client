import {Route} from '@angular/router';
import {RouteBuildConfig, RouteConfiguration, RouteRoot, RouteWild} from 'src/app/routing';
import {NavigationBarItem, NavigationBarItemsData} from '../../widget/navigation-bar';

const routeNavs: Record<string, NavigationBarItem> = {
  [RouteBuildConfig]: {icon: 'build_config', route: RouteBuildConfig, label: 'Build Settings'},
  [RouteConfiguration]: {icon: 'configuration', route: RouteConfiguration, label: 'Configuration'},
};

const data: NavigationBarItemsData = {
  navigationBarItems: Object.values(routeNavs),
};

export default [
  {
    path: RouteRoot,
    loadComponent: () => import('../../widget/navigation-content').then((ii) => ii.NavigationContentComponent),
    data,
    children: [
      {path: RouteConfiguration, loadChildren: () => import('../config/routes')},
      {path: RouteBuildConfig, loadChildren: () => import('src/app/module/widget/build/build.module').then((m) => m.BuildModule)},
      {path: RouteRoot, redirectTo: RouteConfiguration, pathMatch: 'full'},
      {path: RouteWild, redirectTo: RouteConfiguration},
    ],
  },
] as Route[];
