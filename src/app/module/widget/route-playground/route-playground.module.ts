import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {NavigationBarItem, NavigationBarItemsData} from '../navigation-bar';
import {NavigationContentComponent, NavigationContentModule} from '../navigation-content';
import {PlaygroundRoute} from './playground-route';

const routeNavs: Record<PlaygroundRoute, NavigationBarItem> = {
  [PlaygroundRoute.DemoChords]: {icon: 'queue_music', route: PlaygroundRoute.DemoChords, label: 'Chords'},
  [PlaygroundRoute.DemoGhibli]: {icon: 'items3', route: PlaygroundRoute.DemoGhibli, label: 'Ghibli'},
  [PlaygroundRoute.DemoMisc]: {icon: 'items2', route: PlaygroundRoute.DemoMisc, label: 'Misc.'},
};

const data: NavigationBarItemsData = {
  navigationBarItems: Object.values(PlaygroundRoute).map((ii) => routeNavs[ii]),
};

const ROUTING: Routes = [
  {
    path: ROUTE_ROOT,
    component: NavigationContentComponent,
    data,
    children: [
      {
        path: PlaygroundRoute.DemoChords,
        loadChildren: () => import('src/app/module/widget/music/music.module').then((m) => m.RoutedMusicModule),
      },
      {
        path: PlaygroundRoute.DemoMisc,
        loadChildren: () => import('src/app/module/widget/demo-misc/demo-misc.module').then((m) => m.DemoMiscModule),
      },
      {
        path: PlaygroundRoute.DemoGhibli,
        loadChildren: () => import('src/app/module/widget/ghibli/ghibli.module').then((m) => m.GhibliModule),
      },
      {path: ROUTE_ROOT, redirectTo: PlaygroundRoute.DemoMisc, pathMatch: 'full'},
      {path: ROUTE_WILDCARD, redirectTo: PlaygroundRoute.DemoMisc},
    ],
  },
];

@NgModule({imports: [NavigationContentModule, RouterModule.forChild(ROUTING)]})
class RoutePlaygroundModule {}

export {RoutePlaygroundModule};
