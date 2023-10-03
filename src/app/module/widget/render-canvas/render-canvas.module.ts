import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteRoot, RouteWild} from 'src/app/routing';
import {FlexboxDirective} from '../../directive/flexbox';
import {SimpleViewComponent} from '../simple-view';
import {RenderCanvasComponent} from './render-canvas.component';

const ROUTING: Routes = [
  {path: RouteRoot, component: RenderCanvasComponent, pathMatch: 'full'},
  {path: RouteWild, redirectTo: RouteRoot},
];

@NgModule({
  imports: [CommonModule, FlexboxDirective, SimpleViewComponent, RouterModule.forChild(ROUTING)],
  exports: [RenderCanvasComponent],
  declarations: [RenderCanvasComponent],
})
class RenderCanvasModule {}

export {RenderCanvasComponent, RenderCanvasModule};
