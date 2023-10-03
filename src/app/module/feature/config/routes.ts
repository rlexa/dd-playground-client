import {Route} from '@angular/router';
import {RouteRoot, RouteWild} from 'src/app/routing';

export default [
  {path: RouteRoot, loadComponent: () => import('./config.component').then((ii) => ii.ConfigComponent)},
  {path: RouteWild, redirectTo: RouteRoot},
] as Route[];
