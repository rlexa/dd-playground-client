import { fillCanvasColor } from 'app/module/widget/render-canvas/engine/context2d';
import { EngineNodeShell } from './engine-node-shell';

export class EngineNodeFillCanvasColor extends EngineNodeShell<string> {
  protected initFunctions() {
    this.render_self = fillCanvasColor;
  }
}
