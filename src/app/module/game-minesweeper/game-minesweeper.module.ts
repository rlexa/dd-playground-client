import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {SimpleViewModule} from '../widget/simple-view';
import {GameMinesweeperComponent} from './game-minesweeper.component';
import {GameMinesweeperRenderHtmlModule} from './render/game-minesweeper-render-html.module';

const ROUTING: Routes = [
  {path: ROUTE_ROOT, component: GameMinesweeperComponent},
  {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT, pathMatch: 'full'},
];

@NgModule({
  imports: [CommonModule, SimpleViewModule, GameMinesweeperRenderHtmlModule, RouterModule.forChild(ROUTING)],
  exports: [GameMinesweeperComponent],
  declarations: [GameMinesweeperComponent],
})
class GameMinesweeperModule {}

export {GameMinesweeperModule, GameMinesweeperComponent};
