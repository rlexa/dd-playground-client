import {DoneSubject, RxCleanup, rxNext_} from 'dd-rxjs';
import {BehaviorSubject, isObservable, Observable} from 'rxjs';
import {distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {EngineGlobal, EngineNode, FrameParam, ValueOrStream} from './types';

export type HandleRender<T> = (ctx: CanvasRenderingContext2D, state: T, kids: EngineNode<any>[]) => void;
export type HandleFrame<T> = (param: FrameParam, state: T, kids: EngineNode<any>[]) => void;

export interface EngineNodeShellCfg<T> {
  changed$?: (state$: Observable<T>) => Observable<any>;
  frame_self?: HandleFrame<T>;
  frame_kids?: HandleFrame<T>;
  render_pre?: HandleRender<T>;
  render_self?: HandleRender<T>;
  render_kids_pre?: HandleRender<T>;
  render_kids?: HandleRender<T>;
  render_kids_post?: HandleRender<T>;
  render_post?: HandleRender<T>;
}

export class EngineNodeShell<T> implements EngineNode<T> {
  constructor(state: ValueOrStream<T>, name: string = null, cfg: EngineNodeShellCfg<T> = {}) {
    this.setName(name);
    this.name$.pipe(distinctUntilChanged()).subscribe(this.markChanges);

    this.config = {
      render_kids: (ctx, st, kids) => kids.forEach((_) => _.render(ctx)),
      frame_kids: (param, st, kids) => kids.forEach((_) => _.frame(param)),
      changed$: (state$) => state$.pipe(distinctUntilChanged()),
      ...cfg,
    };

    if (isObservable(state)) {
      state.pipe(takeUntil(this.done$)).subscribe(this.setState);
    } else {
      this.setState(state);
    }
  }

  private engine: EngineGlobal = null;
  private config: EngineNodeShellCfg<T> = null;
  @RxCleanup() protected readonly done$ = new DoneSubject();
  @RxCleanup() readonly name$ = new BehaviorSubject<string>(null);
  @RxCleanup() readonly state$ = new BehaviorSubject<T>(null);
  parent: EngineNode<any> = null;
  kids: EngineNode<any>[] = [];

  setName = rxNext_(this.name$);
  setState = rxNext_(this.state$);

  setEngine(val: EngineGlobal) {
    if (!this.engine) {
      this.engine = val;
      if (this.engine) {
        if (typeof this.config.changed$ === 'function') {
          this.config.changed$(this.state$).subscribe(this.markChanges);
        }
      }
    }
  }

  destroy() {
    this.kids.forEach((_) => _.destroy());
  }

  addNode = (kid: EngineNode<any>) => (this.engine ? this.engine.addNode(kid, this) : kid);
  delNode = (kid: EngineNode<any>, destroy = false) => (this.engine ? this.engine.delNode(kid, destroy) : {});

  frame = (param: FrameParam) =>
    [this.config.frame_self, this.config.frame_kids]
      .filter((_) => typeof _ === 'function')
      .forEach((_) => _(param, this.state$.value, this.kids));

  render = (ctx: CanvasRenderingContext2D) =>
    [
      this.config.render_pre,
      this.config.render_self,
      this.config.render_kids_pre,
      this.config.render_kids,
      this.config.render_kids_post,
      this.config.render_post,
    ]
      .filter((_) => typeof _ === 'function')
      .forEach((_) => _(ctx, this.state$.value, this.kids));

  private markChanges = () => (this.engine ? this.engine.markChanges() : {});
}
