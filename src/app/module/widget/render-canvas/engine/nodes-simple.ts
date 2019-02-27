import { fillCanvasWithColor, renderText, WithColor, WithText } from 'app/module/widget/render-canvas/engine/context2d';
import { EngineNodeShell } from './engine-node-shell';
import { ValueOrStream } from './types';

export const enEmpty = (name?: string) => new EngineNodeShell(null, name);
export const enFillCanvas = (data: ValueOrStream<WithColor>, name?: string) => new EngineNodeShell(data, name, { render_self: fillCanvasWithColor });
export const enText = (data: ValueOrStream<WithText>, name?: string) => new EngineNodeShell(data, name, { render_self: renderText });
