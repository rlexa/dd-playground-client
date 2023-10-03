import {Route} from '@angular/router';
import {RouteRoot, RouteWild} from 'src/app/routing';

export default [
  {path: RouteRoot, loadComponent: () => import('./school-math.component').then((ii) => ii.SchoolMathComponent)},
  {path: RouteWild, redirectTo: RouteRoot},
] as Route[];
