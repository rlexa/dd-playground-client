import { RxCleanup, rxNext_ } from 'dd-rxjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { EngineGlobal, EngineNode, FrameParam } from './types';

export class EngineNodeShell<T> implements EngineNode<T> {
  constructor(global: EngineGlobal, state: T) {
    this.init();
    this.state$.next(state);
    if (typeof this.changed$ === 'function') {
      this.changed$(this.state$).subscribe(global.markChanges);
    }
  }

  kids = <EngineNode<any>[]>[];
  @RxCleanup() readonly state$ = new BehaviorSubject(<T>null);

  setState = rxNext_(this.state$);

  protected changed$: (state$: Observable<T>) => Observable<any>;

  protected render_pre: (ctx: CanvasRenderingContext2D, state: T) => void;
  protected render_self: (ctx: CanvasRenderingContext2D, state: T) => void;
  protected render_kids_pre: (ctx: CanvasRenderingContext2D, state: T) => void;
  protected render_kids: (ctx: CanvasRenderingContext2D, state: T) => void;
  protected render_kids_post: (ctx: CanvasRenderingContext2D, state: T) => void;
  protected render_post: (ctx: CanvasRenderingContext2D, state: T) => void;

  protected frame_self: (param: FrameParam, state: T) => void;
  protected frame_kids: (param: FrameParam, state: T) => void;

  // tslint:disable:use-life-cycle-interface
  ngOnDestroy() {
    this.kids.forEach(_ => _.ngOnDestroy());
  }

  frame = (param: FrameParam) => [this.frame_self, this.frame_kids]
    .filter(_ => typeof _ === 'function')
    .forEach(_ => _(param, this.state$.value));

  render = (ctx: CanvasRenderingContext2D) => [this.render_pre, this.render_self, this.render_kids_pre, this.render_kids, this.render_kids_post, this.render_post]
    .filter(_ => typeof _ === 'function')
    .forEach(_ => _(ctx, this.state$.value));

  protected init() {
    this.changed$ = (state$) => state$.pipe(distinctUntilChanged());
    this.render_kids = (ctx, state) => this.kids.forEach(_ => _.render(ctx));
    this.frame_kids = (param, state) => this.kids.forEach(_ => _.frame({ ...param, parent: this }));
    this.initFunctions();
  }

  protected initFunctions() { }
}
