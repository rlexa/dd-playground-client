export interface EngineGlobal {
  markChanges: () => void;
}

export interface EngineNode<T> {
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
