import { renderBackground, renderImage, renderText, WithColor, WithImage, WithText } from './context2d';
import { EngineNodeShell } from './engine-node-shell';
import { ValueOrStream } from './types';

export const enEmpty = (name?: string) => new EngineNodeShell(null, name);
export const enFillCanvas = (data: ValueOrStream<WithColor>, name?: string) => new EngineNodeShell(data, name, { render_self: renderBackground });
export const enImage = (data: ValueOrStream<WithImage>, name?: string) => new EngineNodeShell(data, name, { render_self: renderImage });
export const enText = (data: ValueOrStream<WithText>, name?: string) => new EngineNodeShell(data, name, { render_self: renderText });
