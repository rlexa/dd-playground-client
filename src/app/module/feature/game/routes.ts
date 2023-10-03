import {Route} from '@angular/router';
import {RouteGameDown, RouteGameMineSweeper, RouteGameSnake, RouteRenderCanvas, RouteRoot, RouteWild} from 'src/app/routing';
import {NavigationBarItem, NavigationBarItemsData} from '../../widget/navigation-bar';
import {NavigationContentComponent} from '../../widget/navigation-content';

const routeNavs: Record<string, NavigationBarItem> = {
  [RouteGameMineSweeper]: {icon: 'items1', route: RouteGameMineSweeper, label: 'Minesweeper'},
  [RouteGameSnake]: {icon: 'items2', route: RouteGameSnake, label: 'Snake'},
  [RouteGameDown]: {icon: 'items3', route: RouteGameDown, label: 'Down'},
  [RouteRenderCanvas]: {icon: 'items4', route: RouteRenderCanvas, label: 'Render'},
};

const data: NavigationBarItemsData = {
  navigationBarItems: Object.values(routeNavs),
};

export default [
  {
    path: RouteRoot,
    component: NavigationContentComponent,
    data,
    children: [
      {path: RouteGameDown, loadChildren: () => import('../game-down/routes')},
      {path: RouteGameMineSweeper, loadChildren: () => import('../game-minesweeper/routes')},
      {path: RouteGameSnake, loadChildren: () => import('../game-snake/routes')},
      {path: RouteRenderCanvas, loadChildren: () => import('../render-canvas/routes')},
      {path: RouteRoot, redirectTo: RouteGameMineSweeper, pathMatch: 'full'},
      {path: RouteWild, redirectTo: RouteGameMineSweeper},
    ],
  },
] as Route[];
