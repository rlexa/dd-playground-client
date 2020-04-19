import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {GameMinesweeperRenderHtmlComponent} from './game-minesweeper-render-html.component';

@NgModule({
  imports: [CommonModule],
  exports: [GameMinesweeperRenderHtmlComponent],
  declarations: [GameMinesweeperRenderHtmlComponent],
})
class GameMinesweeperRenderHtmlModule {}

export {GameMinesweeperRenderHtmlModule, GameMinesweeperRenderHtmlComponent};
