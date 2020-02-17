import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {GameSnakeRenderHtmlComponent} from './game-snake-render-html.component';

@NgModule({
  imports: [CommonModule],
  exports: [GameSnakeRenderHtmlComponent],
  declarations: [GameSnakeRenderHtmlComponent],
})
class GameSnakeRenderHtmlModule {}

export {GameSnakeRenderHtmlModule, GameSnakeRenderHtmlComponent};
