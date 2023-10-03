import {DoneSubject, RxCleanup, rxNext_} from 'dd-rxjs';
import {BehaviorSubject, Subject, of} from 'rxjs';
import {catchError, filter, map, startWith, takeUntil, tap, withLatestFrom} from 'rxjs/operators';
import {ImageHolderCanvas} from './context2d';
import {EngineNodeShell} from './engine-node-shell';
import {EngineGlobal, EngineNode} from './types';

export interface NodeStat<T> {
  name?: string;
  kids: NodeStat<any>[];
  state?: T;
}

export const nodeToNodeStat = <T>(node: EngineNode<T>, index = 0): NodeStat<T> =>
  !node
    ? null
    : ({
        name: index + (node.name$.value ? ' ' + node.name$.value : ''),
        state: node.state$.value,
        kids: node.kids.map((_, ii) => nodeToNodeStat(_, ii)),
      } as NodeStat<T>);

export class Engine implements EngineGlobal {
  constructor() {
    this.frame$
      .pipe(
        withLatestFrom(this.ctx$),
        map(([msNow, ctx]) => {
          const msDelta = msNow - this.msLast;
          this.msLast = msNow;
          return {msDelta, changes: this.changes$.value, ctx, root: this.root};
        }),
        tap((_) => {
          if (_.changes > 0 && _.ctx && _.root) {
            // console.log(`render ${_.changes} changes`);
            _.root.render(_.ctx);
            this.changes$.next(0);
          }
        }),
        tap((_) => (_.root ? _.root.frame({msDelta: _.msDelta}) : {})),
        catchError((err) => {
          console.error(err);
          return of(null);
        }),
        takeUntil(this.done$),
      )
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
    startWith(null as string),
    map((id) => {
      try {
        return (document.getElementById(id) as HTMLCanvasElement).getContext('2d', {alpha: false});
      } catch {}
      return null;
    }),
    takeUntil(this.done$),
  );

  readonly images = new ImageHolderCanvas();
  readonly root: EngineNode<any> = null;
  readonly changed$ = this.changes$.pipe(filter((_) => _ > 0));

  nodeToStat = nodeToNodeStat;
  setCanvasId = rxNext_(this.canvasId$);

  destroy() {
    this.root?.destroy();
    this.images.destroy();
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
  };

  delNode = (kid: EngineNode<any>, destroy = false) => {
    if (kid && kid !== this.root) {
      if (kid.parent) {
        kid.parent.kids = kid.parent.kids.filter((_) => _ !== kid);
      }
      if (destroy) {
        kid.destroy();
      }
    }
  };
}
