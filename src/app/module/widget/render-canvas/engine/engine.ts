import { EngineNodeShell } from 'app/module/widget/render-canvas/engine/engine-node-shell';
import { DoneSubject, RxCleanup, rxNext_ } from 'dd-rxjs';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { catchError, map, startWith, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { EngineGlobal, EngineNode } from './types';

export class Engine implements EngineGlobal {
  constructor() {
    this.frame$
      .pipe(
        withLatestFrom(this.ctx$),
        map(([msNow, ctx]) => {
          const msDelta = msNow - this.msLast;
          this.msLast = msNow;
          return { msDelta, changes: this.changes$.value, ctx, root: this.root };
        }),
        tap(_ => {
          if (_.changes > 0 && _.ctx && _.root) {
            // console.log(`render ${_.changes} changes`);
            _.root.render(_.ctx);
            this.changes$.next(0);
          }
        }),
        tap(_ => _.root ? _.root.frame({ msDelta: _.msDelta }) : {}),
        catchError(err => {
          console.error(err);
          return of(null);
        }),
        takeUntil(this.done$))
      .subscribe(() => requestAnimationFrame(rxNext_(this.frame$)));

    this.msLast = performance.now();
    requestAnimationFrame(rxNext_(this.frame$));

    this.root = new EngineNodeShell(this, null, 'root');
  }

  @RxCleanup() private readonly done$ = new DoneSubject();
  @RxCleanup() private readonly canvasId$ = new Subject<string>();
  @RxCleanup() private readonly frame$ = new Subject<number>();
  @RxCleanup() private readonly changes$ = new BehaviorSubject(0);
  readonly root: EngineNode<any> = null;

  private msLast = 0;

  private readonly ctx$ = this.canvasId$.pipe(
    startWith(null),
    map(id => {
      try { return (document.getElementById(id) as HTMLCanvasElement).getContext('2d'); } catch { }
      return null;
    }),
    takeUntil(this.done$));

  setCanvasId = rxNext_(this.canvasId$);

  markChanges = () => this.changes$.next(this.changes$.value + 1);

  // tslint:disable:use-life-cycle-interface
  ngOnDestroy() {
    if (this.root) { this.root.ngOnDestroy(); }
  }
}
