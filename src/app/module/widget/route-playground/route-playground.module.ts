import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteDemoGhibli, RouteDemoMisc, RouteRoot, RouteWild} from 'src/app/routing';
import {NavigationBarItem, NavigationBarItemsData} from '../navigation-bar';
import {NavigationContentComponent} from '../navigation-content';

const routeNavs: Record<string, NavigationBarItem> = {
  [RouteDemoGhibli]: {icon: 'items2', route: RouteDemoGhibli, label: 'Ghibli'},
  [RouteDemoMisc]: {icon: 'items1', route: RouteDemoMisc, label: 'Misc.'},
};

const data: NavigationBarItemsData = {
  navigationBarItems: Object.values(routeNavs),
};

const ROUTING: Routes = [
  {
    path: RouteRoot,
    component: NavigationContentComponent,
    data,
    children: [
      {path: RouteDemoMisc, loadChildren: () => import('../../feature/demo-misc/routes')},
      {path: RouteDemoGhibli, loadChildren: () => import('../../feature/ghibli/routes')},
      {path: RouteRoot, redirectTo: RouteDemoMisc, pathMatch: 'full'},
      {path: RouteWild, redirectTo: RouteDemoMisc},
    ],
  },
];

@NgModule({imports: [NavigationContentComponent, RouterModule.forChild(ROUTING)]})
class RoutePlaygroundModule {}

export {RoutePlaygroundModule};
