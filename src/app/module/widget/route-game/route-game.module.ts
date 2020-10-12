import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_GAME_DOWN, ROUTE_GAME_MINESWEEPER, ROUTE_GAME_SNAKE, ROUTE_RENDER_CANVAS, ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {NavigationContentComponent, NavigationContentComponentRouteData, NavigationContentModule} from '../navigation-content';

const data: NavigationContentComponentRouteData = {
  navs: [
    {icon: 'items1', route: ROUTE_GAME_MINESWEEPER, label: 'Minesweeper'},
    {icon: 'items2', route: ROUTE_GAME_SNAKE, label: 'Snake'},
    {icon: 'items3', route: ROUTE_GAME_DOWN, label: 'Down'},
    {icon: 'items4', route: ROUTE_RENDER_CANVAS, label: 'Render'},
  ],
};

const ROUTING: Routes = [
  {
    path: ROUTE_ROOT,
    component: NavigationContentComponent,
    data,
    children: [
      {
        path: ROUTE_GAME_DOWN,
        loadChildren: () => import('src/app/module/widget/game-down/game-down.module').then((m) => m.GameDownModule),
      },
      {
        path: ROUTE_GAME_MINESWEEPER,
        loadChildren: () => import('src/app/module/game-minesweeper/game-minesweeper.module').then((m) => m.GameMinesweeperModule),
      },
      {
        path: ROUTE_GAME_SNAKE,
        loadChildren: () => import('src/app/module/game-snake/game-snake.module').then((m) => m.GameSnakeModule),
      },
      {
        path: ROUTE_RENDER_CANVAS,
        loadChildren: () => import('src/app/module/widget/render-canvas/render-canvas.module').then((m) => m.RenderCanvasModule),
      },
      {path: ROUTE_ROOT, redirectTo: ROUTE_GAME_MINESWEEPER},
      {path: ROUTE_WILDCARD, redirectTo: ROUTE_GAME_MINESWEEPER, pathMatch: 'full'},
    ],
  },
];

@NgModule({imports: [NavigationContentModule, RouterModule.forChild(ROUTING)]})
class RouteGameModule {}

export {RouteGameModule};
