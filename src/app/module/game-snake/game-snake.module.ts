import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteRoot, RouteWild} from 'src/app/routing';
import {SimpleViewComponent} from '../widget/simple-view';
import {GameSnakeComponent} from './game-snake.component';
import {GameSnakeRenderHtmlModule} from './render/game-snake-render-html.module';

const ROUTING: Routes = [
  {path: RouteRoot, component: GameSnakeComponent, pathMatch: 'full'},
  {path: RouteWild, redirectTo: RouteRoot},
];

@NgModule({
  imports: [CommonModule, SimpleViewComponent, GameSnakeRenderHtmlModule, RouterModule.forChild(ROUTING)],
  exports: [GameSnakeComponent],
  declarations: [GameSnakeComponent],
})
class GameSnakeModule {}

export {GameSnakeComponent, GameSnakeModule};
