import { fillCanvasColor } from 'app/module/widget/render-canvas/engine/context2d';
import { Observable } from 'rxjs';
import { EngineNodeShell } from './engine-node-shell';

export const enFillCanvas = (color: string | Observable<string>, name?: string) => new EngineNodeShell(color, name, { render_self: fillCanvasColor });
