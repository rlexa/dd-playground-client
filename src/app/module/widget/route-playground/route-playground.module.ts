import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteRoot, RouteWild} from 'src/app/routing';
import {NavigationBarItem, NavigationBarItemsData} from '../navigation-bar';
import {NavigationContentComponent} from '../navigation-content';
import {PlaygroundRoute} from './playground-route';

const routeNavs: Record<PlaygroundRoute, NavigationBarItem> = {
  [PlaygroundRoute.DemoGhibli]: {icon: 'items2', route: PlaygroundRoute.DemoGhibli, label: 'Ghibli'},
  [PlaygroundRoute.DemoMisc]: {icon: 'items1', route: PlaygroundRoute.DemoMisc, label: 'Misc.'},
};

const data: NavigationBarItemsData = {
  navigationBarItems: Object.values(PlaygroundRoute).map((ii) => routeNavs[ii]),
};

const ROUTING: Routes = [
  {
    path: RouteRoot,
    component: NavigationContentComponent,
    data,
    children: [
      {
        path: PlaygroundRoute.DemoMisc,
        loadChildren: () => import('src/app/module/widget/demo-misc/demo-misc.module').then((m) => m.DemoMiscModule),
      },
      {
        path: PlaygroundRoute.DemoGhibli,
        loadChildren: () => import('src/app/module/widget/ghibli/ghibli.module').then((m) => m.GhibliModule),
      },
      {path: RouteRoot, redirectTo: PlaygroundRoute.DemoMisc, pathMatch: 'full'},
      {path: RouteWild, redirectTo: PlaygroundRoute.DemoMisc},
    ],
  },
];

@NgModule({imports: [NavigationContentComponent, RouterModule.forChild(ROUTING)]})
class RoutePlaygroundModule {}

export {RoutePlaygroundModule};
