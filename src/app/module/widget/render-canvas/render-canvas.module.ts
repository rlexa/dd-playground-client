import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'app/routing';
import {imports} from './imports';
import {RenderCanvasComponent} from './render-canvas.component';

const ROUTING: Routes = [
  {path: ROUTE_ROOT, component: RenderCanvasComponent},
  {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT, pathMatch: 'full'},
];

@NgModule({imports: [...imports, RouterModule.forChild(ROUTING)], exports: [RenderCanvasComponent], declarations: [RenderCanvasComponent]})
export class RenderCanvasModule {}
