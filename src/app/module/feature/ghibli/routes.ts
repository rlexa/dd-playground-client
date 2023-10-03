import {Route} from '@angular/router';
import {RouteRoot, RouteWild} from 'src/app/routing';

export default [
  {path: RouteRoot, loadComponent: () => import('./ghibli.component').then((ii) => ii.GhibliComponent)},
  {path: RouteWild, redirectTo: RouteRoot},
] as Route[];
