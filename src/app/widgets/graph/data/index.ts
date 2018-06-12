import { IGraphskyData } from 'app/graphsky';

export const TAG_TYPE = '_type';
export interface TypedNode extends IGraphskyData {
  [TAG_TYPE]: string;
}

export interface Country extends TypedNode {
  code: string;
  name: string;
  nameNative: string;
  nameShort: string;
  nameShortNative: string;
}
