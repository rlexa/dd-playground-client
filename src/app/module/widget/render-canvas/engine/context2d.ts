export const setFillStyle = (ctx: CanvasRenderingContext2D, color: string) => ctx.fillStyle = color;
export const fillRectColor = (ctx: CanvasRenderingContext2D, color: string, xx: number, yy: number, ww: number, hh: number) => {
  setFillStyle(ctx, color);
  ctx.fillRect(xx, yy, ww, hh);
}
export const fillCanvasColor = (ctx: CanvasRenderingContext2D, color: string) => fillRectColor(ctx, color, 0, 0, ctx.canvas.width, ctx.canvas.height);

export const setFillStyle_ = (color: string) => (ctx: CanvasRenderingContext2D) => setFillStyle(ctx, color);
export const fillRectColor_ = (color: string, xx: number, yy: number, ww: number, hh: number) => (ctx: CanvasRenderingContext2D) => fillRectColor(ctx, color, xx, yy, ww, hh);
export const fillCanvasColor_ = (color: string) => (ctx: CanvasRenderingContext2D) => fillCanvasColor(ctx, color);
