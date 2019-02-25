import { BehaviorSubject } from 'rxjs';

export interface EngineGlobal {
  addNode: (kid: EngineNode<any>, parent: EngineNode<any>) => void;
  delNode: (kid: EngineNode<any>, destroy: boolean) => void;
  markChanges: () => void;
}

export interface EngineNode<T> {
  parent: EngineNode<any>;
  kids: EngineNode<any>[];
  state$: BehaviorSubject<T>;
  name$: BehaviorSubject<string>;
  setEngine: (engine: EngineGlobal) => void;
  addNode: (kid: EngineNode<any>) => void;
  delNode: (kid: EngineNode<any>, destroy?: boolean) => void;
  frame: (param: FrameParam) => void;
  render: (ctx: CanvasRenderingContext2D) => void;
  setName: (val: string) => void;
  setState: (val: T) => void;
  ngOnDestroy();
}

export interface FrameParam {
  msDelta: number,
}
