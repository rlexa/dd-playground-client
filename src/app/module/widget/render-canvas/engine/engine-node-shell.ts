import { DoneSubject, RxCleanup } from 'dd-rxjs';
import { BehaviorSubject, isObservable, Observable } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { EngineGlobal, EngineNode, FrameParam } from './types';

export class EngineNodeShell<T> implements EngineNode<T> {
  constructor(global: EngineGlobal, state: T | Observable<T>, public name: string = null) {
    this.init();
    if (isObservable(state)) {
      state.pipe(takeUntil(this.done$)).subscribe(_ => this.state = _);
    } else {
      this.state = state;
    }
    if (typeof this.changed$ === 'function') {
      this.changed$(this.state$).subscribe(global.markChanges);
    }
  }

  parent = <EngineNode<any>>null;
  kids = <EngineNode<any>[]>[];
  @RxCleanup() protected readonly done$ = new DoneSubject();
  @RxCleanup() readonly state$ = new BehaviorSubject(<T>null);

  get state() { return this.state$.value; }
  set state(val: T) { this.state$.next(val); }

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

  addNode = (kid: EngineNode<any>) => {
    if (kid && kid.parent !== this) {
      if (kid.parent) {
        kid.parent.delNode(kid);
      }
      this.kids = [...this.kids, kid];
      kid.parent = this;
    }
  }

  delNode = (kid: EngineNode<any>, destroy?: boolean) => {
    if (kid && kid.parent === this) {
      this.kids = this.kids.filter(_ => _ !== kid);
      kid.parent = null;
      if (destroy) {
        kid.ngOnDestroy();
      }
    }
  }

  frame = (param: FrameParam) => [this.frame_self, this.frame_kids]
    .filter(_ => typeof _ === 'function')
    .forEach(_ => _(param, this.state$.value));

  render = (ctx: CanvasRenderingContext2D) => [this.render_pre, this.render_self, this.render_kids_pre, this.render_kids, this.render_kids_post, this.render_post]
    .filter(_ => typeof _ === 'function')
    .forEach(_ => _(ctx, this.state$.value));

  protected init() {
    this.render_kids = (ctx, state) => this.kids.forEach(_ => _.render(ctx));
    this.frame_kids = (param, state) => this.kids.forEach(_ => _.frame(param));
    this.initFunctions();
    this.changed$ = this.changed$ || ((state$) => state$.pipe(distinctUntilChanged()));
  }

  protected initFunctions() { }
}
