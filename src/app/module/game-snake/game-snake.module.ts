import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {SimpleViewModule} from '../widget/simple-view';
import {GameSnakeComponent} from './game-snake.component';

const ROUTING: Routes = [
  {path: ROUTE_ROOT, component: GameSnakeComponent},
  {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT, pathMatch: 'full'},
];

@NgModule({
  imports: [CommonModule, SimpleViewModule, RouterModule.forChild(ROUTING)],
  exports: [GameSnakeComponent],
  declarations: [GameSnakeComponent],
})
class GameSnakeModule {}

export {GameSnakeModule, GameSnakeComponent};
