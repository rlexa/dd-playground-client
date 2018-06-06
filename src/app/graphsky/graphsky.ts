import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type GraphskyValue = string | boolean | number | null;
interface IGraphskyData { [key: string]: GraphskyValue };

interface IGraphskyNode {
  data: IGraphskyData,
  ms: number,
}

interface IGraphskyState {
  nodes: number,
}

interface IGraphskyQueryResultNode {
  data: IGraphskyData,
}

interface IGraphskyQueryResultItem {
  count: number,
  nodes: IGraphskyQueryResultNode[],
  skip: number,
  take: number,
}

interface IGraphskyQueryResult {
  [tag: string]: IGraphskyQueryResultItem
}

export class GraphskyQuery {
  static readonly DEFAULT_ALIAS = 'result';

  private _alias = GraphskyQuery.DEFAULT_ALIAS;
  private _skip = 0;
  private _take = <number>null;
  private _match = (val: IGraphskyData) => true;

  alias = (val: string) => {
    this._alias = val || GraphskyQuery.DEFAULT_ALIAS;
    return this;
  }

  match = (val: (IGraphskyData) => boolean) => {
    this._match = val ? val : (vval: IGraphskyData) => true;
    return this;
  }

  skip = (val: number) => {
    this._skip = Math.max(+val, 0);
    return this;
  }

  take = (val: number) => {
    this._take = Math.max(+val, 0);
    return this;
  }

  getAlias = () => this._alias;
  getMatch = () => this._match;
  getSkip = () => this._skip;
  getTake = () => this._take;
}

interface IGraphsky {
  change$: Observable<void>;
  log$: BehaviorSubject<IGraphskyState>;
  nodeCount$: BehaviorSubject<number>;
  add: (data: IGraphskyData[]) => void;
  destroy: () => void;
  drop: () => void;
  query: (query?: GraphskyQuery) => IGraphskyQueryResult;
  remove: (data: IGraphskyData[]) => void;
}

const fromNodeToQueryResultItem = (node: IGraphskyNode) => <IGraphskyQueryResultNode>{ data: node.data };

const resolveInto = (into: IGraphskyQueryResult, from: IGraphskyNode[], query: GraphskyQuery) => {
  const target = from.filter(ii => query.getMatch()(ii.data));
  into[query.getAlias()] = {
    count: target.length,
    nodes: typeof query.getTake() === 'number' ? target.slice(query.getSkip(), query.getTake()) : target.slice(query.getSkip()),
    skip: query.getSkip(),
    take: query.getTake(),
  };
  return into;
}

const resolve = (query: GraphskyQuery, nodes: IGraphskyNode[]): IGraphskyQueryResult =>
  resolveInto(<IGraphskyQueryResult>{}, nodes || [], query || new GraphskyQuery());

export class Graphsky implements IGraphsky {
  private readonly nodes$ = new BehaviorSubject(<IGraphskyNode[]>[]);

  readonly change$ = this.nodes$.pipe(map(() => { }));
  readonly log$ = new BehaviorSubject(<IGraphskyState>{ nodes: 0 });
  readonly nodeCount$ = new BehaviorSubject(0);

  constructor() {
    this.change$.subscribe(() => {
      this.nodeCount$.next(this.nodes$.value.length);
    });

    this.nodeCount$.subscribe(nodes => this.log$.next({ ...this.log$.value, nodes }));
  }

  add = (nodes: IGraphskyData[]) => this.nodes$.next(
    this.nodes$.value.concat((nodes || [])
      .filter(ii => typeof ii === 'object' && ii !== null && ii !== undefined && toString.call(ii) === '[object Object]')
      .map(ii => ({ data: Object.freeze(ii), ms: Date.now() })))
      .sort((aa, bb) => aa.ms - bb.ms)
  );

  destroy = () => {
    [this.log$, this.nodes$, this.nodeCount$].forEach(ii => ii.complete());
  }

  drop = () => this.nodes$.next([]);

  query = (val?: GraphskyQuery) => resolve(val, this.nodes$.value);

  remove = (nodes: IGraphskyData[]) => !nodes || nodes.length < 1 ? {} : this.nodes$.next(this.nodes$.value.filter(ii => !nodes.includes(ii.data)));
}
