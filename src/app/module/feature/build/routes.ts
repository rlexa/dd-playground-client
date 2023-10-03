import {Route} from '@angular/router';
import {RouteRoot, RouteWild} from 'src/app/routing';

export default [
  {path: RouteRoot, loadComponent: () => import('./build.component').then((ii) => ii.BuildComponent)},
  {path: RouteWild, redirectTo: RouteRoot},
] as Route[];
