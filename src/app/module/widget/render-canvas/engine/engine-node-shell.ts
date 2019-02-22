import { DoneSubject, RxCleanup } from 'dd-rxjs';
import { BehaviorSubject, isObservable, Observable } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { EngineGlobal, EngineNode, FrameParam } from './types';

export type HandleRender<T> = (ctx: CanvasRenderingContext2D, state: T, kids: EngineNode<any>[]) => void;
export type HandleFrame<T> = (param: FrameParam, state: T, kids: EngineNode<any>[]) => void;

export interface EngineNodeShellCfg<T> {
  changed$?: (state$: Observable<T>) => Observable<any>,
  frame_self?: HandleFrame<T>,
  frame_kids?: HandleFrame<T>,
  render_pre?: HandleRender<T>,
  render_self?: HandleRender<T>,
  render_kids_pre?: HandleRender<T>,
  render_kids?: HandleRender<T>,
  render_kids_post?: HandleRender<T>,
  render_post?: HandleRender<T>,
}

export class EngineNodeShell<T> implements EngineNode<T> {
  constructor(state: T | Observable<T>, name: string = null, cfg: EngineNodeShellCfg<T> = {}) {
    this.name = name;

    this._cfg = {
      render_kids: (ctx, _state, kids) => kids.forEach(_ => _.render(ctx)),
      frame_kids: (param, _state, kids) => kids.forEach(_ => _.frame(param)),
      changed$: state$ => state$.pipe(distinctUntilChanged()),
      ...cfg,
    };

    if (isObservable(state)) {
      state.pipe(takeUntil(this.done$)).subscribe(_ => this.state = _);
    } else {
      this.state = state;
    }
  }

  private _cfg = <EngineNodeShellCfg<T>>null;
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
        if (typeof this._cfg.changed$ === 'function') {
          this._cfg.changed$(this.state$).subscribe(this.engine.markChanges);
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

  // tslint:disable:use-life-cycle-interface
  ngOnDestroy() {
    this.kids.forEach(_ => _.ngOnDestroy());
  }

  addNode = (kid: EngineNode<any>) => this.engine ? this.engine.addNode(kid, this) : {};
  delNode = (kid: EngineNode<any>, destroy = false) => this.engine ? this.engine.delNode(kid, destroy) : {};

  frame = (param: FrameParam) => [this._cfg.frame_self, this._cfg.frame_kids]
    .filter(_ => typeof _ === 'function')
    .forEach(_ => _(param, this.state$.value, this.kids));

  render = (ctx: CanvasRenderingContext2D) =>
    [this._cfg.render_pre, this._cfg.render_self, this._cfg.render_kids_pre, this._cfg.render_kids, this._cfg.render_kids_post, this._cfg.render_post]
      .filter(_ => typeof _ === 'function')
      .forEach(_ => _(ctx, this.state$.value, this.kids));
}
