import {Route} from '@angular/router';
import {RouteRoot, RouteWild} from 'src/app/routing';

export default [
  {path: RouteRoot, loadComponent: () => import('./game-minesweeper.component').then((ii) => ii.GameMinesweeperComponent)},
  {path: RouteWild, redirectTo: RouteRoot},
] as Route[];
