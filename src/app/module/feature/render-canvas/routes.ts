import {Route} from '@angular/router';
import {RouteRoot, RouteWild} from 'src/app/routing';

export default [
  {path: RouteRoot, loadComponent: () => import('./render-canvas.component').then((ii) => ii.RenderCanvasComponent)},
  {path: RouteWild, redirectTo: RouteRoot},
] as Route[];
