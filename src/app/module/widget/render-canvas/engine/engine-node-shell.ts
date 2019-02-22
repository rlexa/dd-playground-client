import { DoneSubject, RxCleanup } from 'dd-rxjs';
import { BehaviorSubject, isObservable, Observable } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { EngineGlobal, EngineNode, FrameParam } from './types';

export class EngineNodeShell<T> implements EngineNode<T> {
  constructor(state: T | Observable<T>, name: string = null) {
    this.name = name;
    this.init();
    if (isObservable(state)) {
      state.pipe(takeUntil(this.done$)).subscribe(_ => this.state = _);
    } else {
      this.state = state;
    }
  }

  private _engine = <EngineGlobal>null;
  private _name = <string>null;
  @RxCleanup() protected readonly done$ = new DoneSubject();
  @RxCleanup() readonly state$ = new BehaviorSubject(<T>null);
  parent = <EngineNode<any>>null;
  kids = <EngineNode<any>[]>[];

  get engine() { return this._engine; }
  set engine(val: EngineGlobal) {
    if (!this._engine) {
      this._engine = val;
      if (this._engine) {
        if (typeof this.changed$ === 'function') {
          this.changed$(this.state$).subscribe(this.engine.markChanges);
        }
      }
    }
  }

  get name() { return this._name; }
  set name(val: string) {
    if (this._name !== val) {
      this._name = val;
      if (this.engine) {
        this.engine.markChanges();
      }
    }
  }

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

  addNode = (kid: EngineNode<any>) => this.engine ? this.engine.addNode(kid, this) : {};
  delNode = (kid: EngineNode<any>, destroy = false) => this.engine ? this.engine.delNode(kid, destroy) : {};

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
