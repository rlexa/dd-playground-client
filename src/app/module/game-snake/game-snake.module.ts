import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {SimpleViewModule} from '../widget/simple-view';
import {GameSnakeComponent} from './game-snake.component';
import {GameSnakeRenderHtmlModule} from './render/game-snake-render-html.module';

const ROUTING: Routes = [
  {path: ROUTE_ROOT, component: GameSnakeComponent, pathMatch: 'full'},
  {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT},
];

@NgModule({
  imports: [CommonModule, SimpleViewModule, GameSnakeRenderHtmlModule, RouterModule.forChild(ROUTING)],
  exports: [GameSnakeComponent],
  declarations: [GameSnakeComponent],
})
class GameSnakeModule {}

export {GameSnakeModule, GameSnakeComponent};
