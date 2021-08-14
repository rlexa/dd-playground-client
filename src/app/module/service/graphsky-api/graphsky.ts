import {Injectable} from '@angular/core';
import {RxCleanup} from 'dd-rxjs';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

type GraphskyValue = string | boolean | number | null;
export interface IGraphskyData {
  [key: string]: GraphskyValue;
}

export interface IGraphskyNode {
  data: IGraphskyData;
  inc: IGraphskyLink[];
  ms: number;
  out: IGraphskyLink[];
}

interface IGraphskyLink {
  data: IGraphskyData;
  from: IGraphskyNode;
  ms: number;
  to: IGraphskyNode;
}

export interface IGraphskyLinkRequest {
  from: IGraphskyData;
  fromNotExact?: boolean;
  to: IGraphskyData;
  toNotExact?: boolean;
  data: IGraphskyData;
}

interface IGraphskyState {
  links: number;
  nodes: number;
}

const equalData = (aa: IGraphskyData, bb: IGraphskyData) =>
  aa &&
  bb &&
  (aa === bb || (Object.keys(aa).length === Object.keys(bb).length && Object.entries(aa).every(([key, val]) => val === bb[key])));
const equalDataSome = (superset: IGraphskyData, subset: IGraphskyData) =>
  superset &&
  subset &&
  (superset === subset ||
    (Object.keys(superset).length >= Object.keys(subset).length && Object.entries(subset).every(([key, val]) => val === superset[key])));

interface IGraphsky {
  change$: Observable<void>;
  log$: BehaviorSubject<IGraphskyState>;
  nodeCount$: BehaviorSubject<number>;
  linkCount$: BehaviorSubject<number>;
  add: (data: IGraphskyData[]) => void;
  remove: (data: IGraphskyData[]) => void;
  link: (links: {from: IGraphskyData; to: IGraphskyData; data: IGraphskyData}[]) => void;
  unlink: (data: IGraphskyData[]) => void;
  query: <T extends any>(whatever: (nodes: IGraphskyNode[], links: IGraphskyLink[]) => T) => T;
  drop: () => void;
  destroy: () => void;
}

@Injectable()
export class Graphsky implements IGraphsky {
  constructor() {
    this.change$.subscribe(() => {
      this.nodeCount$.next(this.nodes$.value.length);
      this.linkCount$.next(this.links$.value.length);
    });

    this.nodeCount$.subscribe((nodes) => this.log$.next({...this.log$.value, nodes}));
    this.linkCount$.subscribe((links) => this.log$.next({...this.log$.value, links}));
  }

  @RxCleanup() private readonly nodes$ = new BehaviorSubject<IGraphskyNode[]>([]);
  @RxCleanup() private readonly links$ = new BehaviorSubject<IGraphskyLink[]>([]);

  readonly change$ = merge(this.links$, this.nodes$).pipe(map(() => {}));
  @RxCleanup() readonly log$ = new BehaviorSubject<IGraphskyState>({links: 0, nodes: 0});
  @RxCleanup() readonly nodeCount$ = new BehaviorSubject(0);
  @RxCleanup() readonly linkCount$ = new BehaviorSubject(0);

  destroy() {}

  add = (nodes: IGraphskyData[]) =>
    this.nodes$.next(
      this.nodes$.value.concat(
        (nodes || [])
          .filter((ii) => typeof ii === 'object' && ii !== null && ii !== undefined && toString.call(ii) === '[object Object]')
          .filter((ii) => !this.nodes$.value.find((jj) => equalData(jj.data, ii)))
          .map<IGraphskyNode>((ii) => ({data: Object.freeze(ii), inc: [], out: [], ms: Date.now()})),
      ),
    );

  remove = (nodes: IGraphskyData[]) => {
    if (!nodes || nodes.length < 1) {
      return;
    }
    const unnode = this.nodes$.value.filter((ii) => nodes.find((jj) => equalData(ii.data, jj)));
    const unlink = this.links$.value.filter((ii) => unnode.includes(ii.from) || unnode.includes(ii.to));
    this.unlink(unlink.map((ii) => ii.data));
    this.nodes$.next(this.nodes$.value.filter((ii) => !unnode.includes(ii)));
  };

  link = (links: IGraphskyLinkRequest[]) =>
    links
      .filter(
        (ii) => typeof ii.data === 'object' && ii.data !== null && ii.data !== undefined && toString.call(ii.data) === '[object Object]',
      )
      .forEach((ii) => {
        const from = this.nodes$.value.find((jj) => (!ii.fromNotExact ? equalData(jj.data, ii.from) : equalDataSome(jj.data, ii.from)));
        const to = this.nodes$.value.find((jj) => (!ii.toNotExact ? equalData(jj.data, ii.to) : equalDataSome(jj.data, ii.to)));
        if (from && to && from !== to && !this.links$.value.find((jj) => jj.from === from && jj.to === to && equalData(ii.data, jj.data))) {
          const link: IGraphskyLink = {data: Object.freeze(ii.data), from, to, ms: Date.now()};
          from.out.push(link);
          to.inc.push(link);
          this.links$.next([...this.links$.value, link]);
        }
      });

  unlink = (links: IGraphskyData[]) => {
    if (!links || links.length < 1) {
      return;
    }
    const unlink = this.links$.value.filter((ii) => links.find((jj) => equalData(jj, ii.data)));
    unlink.forEach((link) => {
      link.from.out = link.from.out.filter((jj) => jj !== link);
      link.to.inc = link.to.inc.filter((jj) => jj !== link);
    });
    this.links$.next(this.links$.value.filter((ii) => !unlink.includes(ii)));
  };

  query = <T extends any>(whatever: (nodes: IGraphskyNode[], links: IGraphskyLink[]) => T) =>
    whatever(this.nodes$.value, this.links$.value);

  drop = () => {
    this.links$.next([]);
    this.nodes$.next([]);
  };
}
