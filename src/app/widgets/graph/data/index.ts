import { IGraphskyData } from 'app/graphsky';

export interface TypedNode extends IGraphskyData {
  _type: string;
}

export interface Country extends TypedNode {
  code: string;
  name: string;
  nameNative: string;
  nameShort: string;
  nameShortNative: string;
}
