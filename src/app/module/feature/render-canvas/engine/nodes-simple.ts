import {isObservable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {
  renderBackground,
  renderImage,
  renderText,
  transform,
  transformPop,
  transformPush,
  WithColor,
  WithImage,
  WithImageUrl,
  WithText,
  WithTransform,
} from './context2d';
import {EngineNodeShell} from './engine-node-shell';
import {ImageHolder, ValueOrStream} from './types';

export const enEmpty = (name?: string) => new EngineNodeShell(null, name);

export const enFillCanvas = (data: ValueOrStream<WithColor>, name?: string) =>
  new EngineNodeShell(data, name, {render_self: renderBackground});
export const enFillCanvasColor = (data: ValueOrStream<string>, name?: string) =>
  enFillCanvas((isObservable(data) ? data : of(data)).pipe(map(color => ({color} as WithColor))), name);

export const enImage = (data: ValueOrStream<WithImage>, name?: string) => new EngineNodeShell(data, name, {render_self: renderImage});
export const enImageUrl = (images: ImageHolder<CanvasImageSource>, data: ValueOrStream<WithImageUrl>, name?: string) =>
  enImage(
    (isObservable(data) ? data : of(data)).pipe(switchMap(_ => images.get$(_.url).pipe(map(image => ({..._, image} as WithImage))))),
    name,
  );

export const enText = (data: ValueOrStream<WithText>, name?: string) => new EngineNodeShell(data, name, {render_self: renderText});

export const enTransform = (data: ValueOrStream<WithTransform>, name?: string) =>
  new EngineNodeShell(data, name, {
    render_pre: transformPush,
    render_self: transform,
    render_post: transformPop,
  });
