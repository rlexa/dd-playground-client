import {Route} from '@angular/router';
import {RouteRoot, RouteWild} from 'src/app/routing';

export default [
  {path: RouteRoot, loadComponent: () => import('./graph-walker.component').then((ii) => ii.GraphWalkerComponent)},
  {path: RouteWild, redirectTo: RouteRoot},
] as Route[];
