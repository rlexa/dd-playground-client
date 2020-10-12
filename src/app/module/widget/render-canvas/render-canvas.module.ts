import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {FlexboxModule} from '../../directive/flexbox';
import {SimpleViewModule} from '../simple-view';
import {RenderCanvasComponent} from './render-canvas.component';

const ROUTING: Routes = [
  {path: ROUTE_ROOT, component: RenderCanvasComponent, pathMatch: 'full'},
  {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT},
];

@NgModule({
  imports: [CommonModule, FlexboxModule, SimpleViewModule, RouterModule.forChild(ROUTING)],
  exports: [RenderCanvasComponent],
  declarations: [RenderCanvasComponent],
})
class RenderCanvasModule {}

export {RenderCanvasModule, RenderCanvasComponent};
