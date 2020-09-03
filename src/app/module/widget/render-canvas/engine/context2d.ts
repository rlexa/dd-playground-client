import {RxCleanup} from 'dd-rxjs';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {ImageHolder, ImageMeta} from './types';

export interface WithColor {
  color?: string;
}

export interface WithOffset {
  offsetX?: number;
  offsetY?: number;
}

export interface WithSize {
  height?: number;
  width?: number;
}

export interface WithImage extends WithOffset, WithSize {
  dx?: number;
  dy?: number;
  dw?: number;
  dh?: number;
  image?: CanvasImageSource;
}

export interface WithImageUrl extends WithImage {
  url?: string;
}

export interface WithRect extends WithOffset, WithSize {}

export interface WithTransform {
  anchorX?: number;
  anchorY?: number;
  degrees?: number;
  moveX?: number;
  moveY?: number;
  scaleX?: number;
  scaleY?: number;
}

export interface WithText extends WithColor, WithOffset {
  align?: CanvasTextAlign;
  base?: CanvasTextBaseline;
  font?: string;
  text?: string;
}

export class ImageHolderCanvas implements ImageHolder<CanvasImageSource> {
  @RxCleanup() private readonly urlToImage$ = new BehaviorSubject<Record<string, CanvasImageSource>>({});

  readonly images$ = this.urlToImage$.pipe(
    map((urlToImage) =>
      Object.entries(urlToImage)
        .filter(([key, val]) => !!val)
        .reduce<ImageMeta>((acc, [key, val]) => ({...acc, [key]: {width: val.width, height: val.height}} as ImageMeta), {}),
    ),
  );

  destroy() {}

  get$(url: string) {
    if (url && !(url in this.urlToImage$.value)) {
      this.urlToImage$.next({...this.urlToImage$.value, [url]: null});
      const img = new Image();
      img.onload = () => this.urlToImage$.next({...this.urlToImage$.value, [url]: img});
      img.onerror = (err) => console.error(`Couldn't add image ` + url, err);
      img.src = url;
    }
    return this.urlToImage$.pipe(map((_) => _[url]));
  }
}

export const blitImage = (ctx: CanvasRenderingContext2D, data: WithImage) =>
  !data || !data.image
    ? {}
    : ctx.drawImage(
        data.image,
        data.dx || 0,
        data.dy || 0,
        data.dw >= 0 ? data.dw || 0 : (data.image.width as number),
        data.dh >= 0 ? data.dh || 0 : (data.image.height as number),
        data.offsetX || 0,
        data.offsetY || 0,
        data.width >= 0 ? data.width || 0 : data.dw >= 0 ? data.dw || 0 : (data.image.width as number),
        data.height >= 0 ? data.height || 0 : data.dh >= 0 ? data.dh || 0 : (data.image.height as number),
      );
export const fillRect = (ctx: CanvasRenderingContext2D, data: WithRect) =>
  data ? ctx.fillRect(data.offsetX || 0, data.offsetY || 0, data.width || 0, data.height || 0) : {};
export const fillCanvas = (ctx: CanvasRenderingContext2D) =>
  fillRect(ctx, {offsetX: 0, offsetY: 0, width: ctx.canvas.width, height: ctx.canvas.height});
export const fillStyle = (ctx: CanvasRenderingContext2D, data: WithColor) => (data && data.color ? (ctx.fillStyle = data.color) : {});
export const fillText = (ctx: CanvasRenderingContext2D, data: WithText) =>
  data && data.text ? ctx.fillText(data.text || '', data.offsetX || 0, data.offsetY || 0) : {};
export const textAlign = (ctx: CanvasRenderingContext2D, data: WithText) => (data ? (ctx.textAlign = data.align || 'left') : {});
export const textBase = (ctx: CanvasRenderingContext2D, data: WithText) => (data ? (ctx.textBaseline = data.base || 'top') : {});
export const textFont = (ctx: CanvasRenderingContext2D, data: WithText) => (data && data.font ? (ctx.font = data.font) : {});
export const transform = (ctx: CanvasRenderingContext2D, data: WithTransform) => {
  if (data) {
    ctx.translate(data.anchorX || 0, data.anchorY || 0);
    ctx.translate(data.moveX || 0, data.moveY || 0);
    ctx.rotate(((data.degrees || 0) * Math.PI) / 180);
    ctx.scale(data.scaleX === undefined ? 1 : data.scaleX, data.scaleY === undefined ? 1 : data.scaleY);
    ctx.translate(-(data.anchorX || 0), -(data.anchorY || 0));
  }
};
export const transformPop = (ctx: CanvasRenderingContext2D) => ctx.restore();
export const transformPush = (ctx: CanvasRenderingContext2D) => ctx.save();

const each = <T>(ctx: CanvasRenderingContext2D, data: T, ...funcs: ((ctx: CanvasRenderingContext2D, data: T) => void)[]) =>
  (funcs || []).forEach((_) => _(ctx, data));
const fEeach = <T>(...funcs: ((ctx: CanvasRenderingContext2D, data: T) => void)[]) => (ctx: CanvasRenderingContext2D, data: T) =>
  each(ctx, data, ...funcs);

export const renderBackground = fEeach(fillStyle, fillCanvas);
export const renderImage = fEeach(blitImage);
export const renderText = fEeach<WithText>(fillStyle, textAlign, textBase, textFont, fillText);
