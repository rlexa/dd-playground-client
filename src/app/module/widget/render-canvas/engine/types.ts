export interface EngineGlobal {
  addNode: (kid: EngineNode<any>, parent: EngineNode<any>) => void;
  delNode: (kid: EngineNode<any>, destroy: boolean) => void;
  markChanges: () => void;
}

export interface EngineNode<T> {
  engine: EngineGlobal;
  parent: EngineNode<any>;
  kids: EngineNode<any>[];
  name: string;
  state: T;
  addNode: (kid: EngineNode<any>) => void;
  delNode: (kid: EngineNode<any>, destroy?: boolean) => void;
  frame: (param: FrameParam) => void;
  render: (ctx: CanvasRenderingContext2D) => void;
  ngOnDestroy();
}

export interface FrameParam {
  msDelta: number,
}
