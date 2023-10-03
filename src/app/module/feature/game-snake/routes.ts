import {Route} from '@angular/router';
import {RouteRoot, RouteWild} from 'src/app/routing';

export default [
  {path: RouteRoot, loadComponent: () => import('./game-snake.component').then((ii) => ii.GameSnakeComponent)},
  {path: RouteWild, redirectTo: RouteRoot},
] as Route[];
