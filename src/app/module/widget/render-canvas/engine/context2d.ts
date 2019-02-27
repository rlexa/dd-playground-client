export interface WithColor {
  color?: string,
}

export interface WithOffset {
  offsetX?: number,
  offsetY?: number,
}

export interface WithSize {
  height?: number,
  width?: number,
}

export interface WithRect extends WithOffset, WithSize { }

export interface WithText extends WithColor, WithOffset {
  align?: CanvasTextAlign,
  base?: CanvasTextBaseline,
  font?: string,
  text?: string,
}

export const fillCanvas = (ctx: CanvasRenderingContext2D) => fillRect(ctx, { offsetX: 0, offsetY: 0, width: ctx.canvas.width, height: ctx.canvas.height });
export const fillStyle = (ctx: CanvasRenderingContext2D, data: WithColor) => data && data.color ? ctx.fillStyle = data.color : {};
export const fillRect = (ctx: CanvasRenderingContext2D, data: WithRect) => data ? ctx.fillRect(data.offsetX || 0, data.offsetY || 0, data.width || 0, data.height || 0) : {};
export const fillText = (ctx: CanvasRenderingContext2D, data: WithText) => data && data.text ? ctx.fillText(data.text || '', data.offsetX || 0, data.offsetY || 0) : {};
export const textAlign = (ctx: CanvasRenderingContext2D, data: WithText) => data ? ctx.textAlign = data.align || 'left' : {};
export const textBase = (ctx: CanvasRenderingContext2D, data: WithText) => data ? ctx.textBaseline = data.base || 'top' : {};
export const textFont = (ctx: CanvasRenderingContext2D, data: WithText) => data && data.font ? ctx.font = data.font : {};

const each = <T>(ctx: CanvasRenderingContext2D, data: T, ...funcs: ((ctx: CanvasRenderingContext2D, data: T) => void)[]) => (funcs || []).forEach(_ => _(ctx, data));
const each_ = <T>(...funcs: ((ctx: CanvasRenderingContext2D, data: T) => void)[]) => (ctx: CanvasRenderingContext2D, data: T) => each(ctx, data, ...funcs);

export const fillCanvasWithColor = each_(fillStyle, fillCanvas);
export const renderText = each_<WithText>(fillStyle, textAlign, textBase, textFont, fillText);
