export interface WithColor { color?: string, }
export interface WithText { text?: string, font?: string, base?: CanvasTextBaseline, align?: CanvasTextAlign }

export const fillRect = (ctx: CanvasRenderingContext2D, xx: number, yy: number, ww: number, hh: number) => ctx.fillRect(xx, yy, ww, hh);
export const fillStyle = (ctx: CanvasRenderingContext2D, data: WithColor) => data && data.color ? ctx.fillStyle = data.color : {};
export const fillText = (ctx: CanvasRenderingContext2D, data: WithText) => data && data.text ? ctx.fillText(data.text || '', 0, 0) : {};
export const textAlign = (ctx: CanvasRenderingContext2D, data: WithText) => data ? ctx.textAlign = data.align || 'left' : {};
export const textBase = (ctx: CanvasRenderingContext2D, data: WithText) => data ? ctx.textBaseline = data.base || 'top' : {};
export const textFont = (ctx: CanvasRenderingContext2D, data: WithText) => data && data.font ? ctx.font = data.font : {};

export const fillCanvasWithColor = (ctx: CanvasRenderingContext2D, data: WithColor) => {
  fillStyle(ctx, data);
  fillRect(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height);
}

export const renderText = (ctx: CanvasRenderingContext2D, data: WithText & WithColor) => {
  textAlign(ctx, data);
  textBase(ctx, data);
  textFont(ctx, data);
  fillStyle(ctx, data);
  fillText(ctx, data);
}
