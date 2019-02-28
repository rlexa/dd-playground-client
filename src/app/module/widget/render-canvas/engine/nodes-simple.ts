import { isObservable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { renderBackground, renderImage, renderText, WithColor, WithImage, WithImageUrl, WithText } from './context2d';
import { EngineNodeShell } from './engine-node-shell';
import { ImageHolder, ValueOrStream } from './types';

export const enEmpty = (name?: string) => new EngineNodeShell(null, name);
export const enFillCanvas = (data: ValueOrStream<WithColor>, name?: string) => new EngineNodeShell(data, name, { render_self: renderBackground });
export const enImage = (data: ValueOrStream<WithImage>, name?: string) => new EngineNodeShell(data, name, { render_self: renderImage });
export const enImageUrl = (images: ImageHolder<CanvasImageSource>, data: ValueOrStream<WithImageUrl>, name?: string) =>
  enImage(
    (isObservable(data) ? data : of(data)).pipe(
      switchMap(_ => images.get$(_.url).pipe(
        map(image => <WithImage>{ ..._, image })))),
    name);
export const enText = (data: ValueOrStream<WithText>, name?: string) => new EngineNodeShell(data, name, { render_self: renderText });
