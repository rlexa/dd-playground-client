import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {NavigationBarItem, NavigationBarItemsData} from '../navigation-bar';
import {NavigationContentComponent, NavigationContentModule} from '../navigation-content';
import {GameRoute} from './game-route';

const routeNavs: Record<GameRoute, NavigationBarItem> = {
  [GameRoute.Down]: {icon: 'items3', route: GameRoute.Down, label: 'Down'},
  [GameRoute.MineSweeper]: {icon: 'items1', route: GameRoute.MineSweeper, label: 'Minesweeper'},
  [GameRoute.RenderCanvas]: {icon: 'items4', route: GameRoute.RenderCanvas, label: 'Render'},
  [GameRoute.Snake]: {icon: 'items2', route: GameRoute.Snake, label: 'Snake'},
};

const data: NavigationBarItemsData = {
  navigationBarItems: Object.values(GameRoute).map((ii) => routeNavs[ii]),
};

const ROUTING: Routes = [
  {
    path: ROUTE_ROOT,
    component: NavigationContentComponent,
    data,
    children: [
      {
        path: GameRoute.Down,
        loadChildren: () => import('src/app/module/widget/game-down/game-down.module').then((m) => m.GameDownModule),
      },
      {
        path: GameRoute.MineSweeper,
        loadChildren: () => import('src/app/module/game-minesweeper/game-minesweeper.module').then((m) => m.GameMinesweeperModule),
      },
      {
        path: GameRoute.Snake,
        loadChildren: () => import('src/app/module/game-snake/game-snake.module').then((m) => m.GameSnakeModule),
      },
      {
        path: GameRoute.RenderCanvas,
        loadChildren: () => import('src/app/module/widget/render-canvas/render-canvas.module').then((m) => m.RenderCanvasModule),
      },
      {path: ROUTE_ROOT, redirectTo: GameRoute.MineSweeper, pathMatch: 'full'},
      {path: ROUTE_WILDCARD, redirectTo: GameRoute.MineSweeper},
    ],
  },
];

@NgModule({imports: [NavigationContentModule, RouterModule.forChild(ROUTING)]})
class RouteGameModule {}

export {RouteGameModule};
