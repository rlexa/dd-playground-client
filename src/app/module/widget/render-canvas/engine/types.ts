export interface EngineGlobal {
  markChanges: () => void;
}

export interface EngineNode<T> {
  kids: EngineNode<any>[];
  setState: (state: T) => void;
  frame: (param: FrameParam) => void;
  render: (ctx: CanvasRenderingContext2D) => void;
  ngOnDestroy();
}

export interface FrameParam {
  msDelta: number,
  parent: EngineNode<any>,
}
