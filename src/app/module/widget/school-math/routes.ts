import {Route} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from '../../../routing';

export default [
  {path: ROUTE_ROOT, loadComponent: () => import('./school-math.component').then((ii) => ii.SchoolMathComponent)},
  {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT},
] as Route[];
