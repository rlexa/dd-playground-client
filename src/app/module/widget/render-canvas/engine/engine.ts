import { ImageHolderCanvas } from 'app/module/widget/render-canvas/engine/context2d';
import { EngineNodeShell } from 'app/module/widget/render-canvas/engine/engine-node-shell';
import { DoneSubject, RxCleanup, rxNext_ } from 'dd-rxjs';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { catchError, filter, map, startWith, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { EngineGlobal, EngineNode } from './types';

export interface NodeStat<T> {
  name?: string,
  kids: NodeStat<any>[],
  state?: T,
}

export const nodeToNodeStat = <T>(node: EngineNode<T>, index = 0): NodeStat<T> => !node ? null : <NodeStat<T>>{
  name: index + (node.name$.value ? ' ' + node.name$.value : ''),
  state: node.state$.value,
  kids: node.kids.map((_, ii) => nodeToNodeStat(_, ii)),
};

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

    this.root = new EngineNodeShell(null, 'root');
    this.root.setEngine(this);
  }

  @RxCleanup() private readonly done$ = new DoneSubject();
  @RxCleanup() private readonly canvasId$ = new Subject<string>();
  @RxCleanup() private readonly frame$ = new Subject<number>();
  @RxCleanup() private readonly changes$ = new BehaviorSubject(0);

  private msLast = 0;

  private readonly ctx$ = this.canvasId$.pipe(
    startWith(null),
    map(id => {
      try { return (document.getElementById(id) as HTMLCanvasElement).getContext('2d', { alpha: false }); } catch { }
      return null;
    }),
    takeUntil(this.done$));

  readonly images = new ImageHolderCanvas();
  readonly root: EngineNode<any> = null;
  readonly changed$ = this.changes$.pipe(filter(_ => _ > 0));

  nodeToStat = nodeToNodeStat;
  setCanvasId = rxNext_(this.canvasId$);

  // tslint:disable:use-life-cycle-interface
  ngOnDestroy() {
    if (this.root) { this.root.ngOnDestroy(); }
    this.images.ngOnDestroy();
  }

  markChanges = () => this.changes$.next(this.changes$.value + 1);

  addNode = (kid: EngineNode<any>, parent = this.root) => {
    if (kid && kid !== this.root && kid !== parent && kid.parent !== parent) {
      kid.setEngine(this);
      if (kid.parent) {
        kid.parent.delNode(kid);
      }
      parent.kids = [...parent.kids, kid];
      kid.parent = parent;
    }
    return kid;
  }

  delNode = (kid: EngineNode<any>, destroy = false) => {
    if (kid && kid !== this.root) {
      if (kid.parent) {
        kid.parent.kids = kid.parent.kids.filter(_ => _ !== kid);
      }
      if (destroy) {
        kid.ngOnDestroy();
      }
    }
  }
}
