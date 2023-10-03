import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteRoot, RouteWild} from 'src/app/routing';
import {NavigationBarItem, NavigationBarItemsData} from '../navigation-bar';
import {NavigationContentComponent} from '../navigation-content';
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
    path: RouteRoot,
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
      {path: GameRoute.Snake, loadChildren: () => import('../../feature/game-snake/routes')},
      {path: GameRoute.RenderCanvas, loadChildren: () => import('../../feature/render-canvas/routes')},
      {path: RouteRoot, redirectTo: GameRoute.MineSweeper, pathMatch: 'full'},
      {path: RouteWild, redirectTo: GameRoute.MineSweeper},
    ],
  },
];

@NgModule({imports: [NavigationContentComponent, RouterModule.forChild(ROUTING)]})
class RouteGameModule {}

export {RouteGameModule};
