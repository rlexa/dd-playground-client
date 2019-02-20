import { DoneSubject, RxCleanup, rxFalse, rxNext_, rxTrue_ } from 'dd-rxjs';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { fillCanvasColor_ } from './context2d';

export interface EngineNode {
  render?: (ctx: CanvasRenderingContext2D) => void,
}

export const renderEngineNode = (ctx: CanvasRenderingContext2D, node: EngineNode) => node.render ? node.render(ctx) : {};

export class Engine {
  @RxCleanup() private readonly done$ = new DoneSubject();
  @RxCleanup() private readonly canvasId$ = new Subject<string>();
  @RxCleanup() private readonly frame$ = new Subject<number>();
  @RxCleanup() private readonly hasChanges = new BehaviorSubject(false);
  @RxCleanup() private readonly root$ = new BehaviorSubject(<EngineNode>{});

  private msLast = 0;

  private readonly ctx$ = this.canvasId$.pipe(
    map(id => {
      try { return (document.getElementById(id) as HTMLCanvasElement).getContext('2d'); } catch { }
      return null;
    }),
    takeUntil(this.done$));

  constructor() {
    this.ctx$.pipe(filter(_ => !!_)).subscribe(fillCanvasColor_('pink'));

    this.frame$
      .pipe(
        withLatestFrom(this.hasChanges, this.ctx$, this.root$),
        map(([msNow, hasChanges, ctx, root]) => {
          const msDelta = msNow - this.msLast;
          this.msLast = msNow;
          return { msDelta, hasChanges, ctx, root };
        }),
        tap(_ => _.hasChanges && _.ctx ? renderEngineNode(_.ctx, _.root) : {}),
        tap(_ => rxFalse(this.hasChanges)),
        takeUntil(this.done$))
      .subscribe(() => requestAnimationFrame(rxNext_(this.frame$)));

    this.msLast = performance.now();
    requestAnimationFrame(rxNext_(this.frame$));
  }

  setCanvasId = rxNext_(this.canvasId$);
  markChanges = rxTrue_(this.hasChanges);

  // tslint:disable:use-life-cycle-interface
  ngOnDestroy() { }
}
