import {Route} from '@angular/router';
import {RouteRoot, RouteWild} from 'src/app/routing';

export default [
  {path: RouteRoot, loadComponent: () => import('./game-down.component').then((ii) => ii.GameDownComponent)},
  {path: RouteWild, redirectTo: RouteRoot},
] as Route[];
