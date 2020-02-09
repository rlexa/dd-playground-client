import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {GraphskyService, IGraphskyNode} from 'src/app/module/service/graphsky-api';
import {RxCleanup, rxNext_} from 'dd-rxjs';
import {BehaviorSubject, combineLatest, of} from 'rxjs';
import {debounceTime, filter, map, withLatestFrom} from 'rxjs/operators';

export const TAG_TYPE = '_type';

const CMP_EQ = '=';
const CMP_NE = '!=';
const CMP_LE = '<=';
const CMP_LT = '<';
const CMP_GE = '>=';
const CMP_GT = '>';
const compareEqual = (cmp: string, aa: any, bb: any) => {
  let ret = false;
  switch (cmp) {
    case CMP_GT:
      ret = aa > bb;
      break;
    case CMP_GE:
      ret = aa >= bb;
      break;
    case CMP_LT:
      ret = aa < bb;
      break;
    case CMP_LE:
      ret = aa <= bb;
      break;
    case CMP_NE:
      ret = aa !== bb;
      break;
    case CMP_EQ:
    default:
      ret = aa === bb;
  }
  return ret;
};

@Component({
  selector: 'app-graph-walker',
  templateUrl: './graph-walker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphWalkerComponent implements OnDestroy, OnInit {
  constructor(private readonly graphsky: GraphskyService) {}

  readonly GRID_FROM = 'from';
  readonly GRID_CURRENT = 'current';
  readonly GRID_TO = 'to';
  readonly GRID = [[this.GRID_FROM, this.GRID_CURRENT, this.GRID_TO]].map(line => '"' + line.join(' ') + '"').join(' ');
  readonly GRID_SIZE = '1fr auto 1fr';

  readonly CMPS = [CMP_LT, CMP_LE, CMP_NE, CMP_EQ, CMP_GE, CMP_GT];

  @RxCleanup() readonly curType$ = new BehaviorSubject<string>(null);
  @RxCleanup() readonly curTag$ = new BehaviorSubject<string>(null);
  @RxCleanup() readonly curVal$ = new BehaviorSubject<string>(null);
  @RxCleanup() readonly curNode$ = new BehaviorSubject<IGraphskyNode>(null);

  readonly dbState$ = this.graphsky.log$;
  readonly dbNodeTypeCount$ = this.graphsky.change$.pipe(
    debounceTime(200),
    map(() =>
      this.graphsky.query((nodes, _) =>
        nodes.reduce<Record<string, number>>(
          (acc, ii) => ({...acc, [ii.data[TAG_TYPE] as string]: (acc[ii.data[TAG_TYPE] as string] || 0) + 1}),
          {},
        ),
      ),
    ),
  );

  readonly dbTypes$ = this.dbNodeTypeCount$.pipe(map(val => Object.keys(val).sort()));
  readonly curTypeFirstNode$ = this.curType$.pipe(
    filter(type => !!type && type.length > 0),
    map(type => this.graphsky.query((nodes, _) => nodes.find(ii => ii.data[TAG_TYPE] === type))),
  );
  readonly curTypeKeys$ = this.curTypeFirstNode$.pipe(map(node => (node ? Object.keys(node.data).filter(ii => ii !== TAG_TYPE) : [])));
  readonly curTypeKeyTagValues$ = combineLatest([this.curType$, this.curTypeKeys$, this.curTag$]).pipe(
    map(([type, keys, tag]) =>
      !type || !keys || !keys.includes(tag)
        ? []
        : this.graphsky.query((nodes, _) =>
            nodes
              .filter(ii => ii.data[TAG_TYPE] === type && tag in ii.data && ii.data[tag] !== null && ii.data[tag] !== undefined)
              .map(ii => ii.data[tag].toString())
              .reduce<string[]>((acc, ii) => (acc.includes(ii) ? acc : [...acc, ii]), [])
              .sort(),
          ),
    ),
  );
  readonly curTypeKeyTagValuesFiltered$ = combineLatest([this.curVal$, this.curTypeKeyTagValues$]).pipe(
    map(([val, vals]) =>
      !val || !val.length ? vals || [] : (vals || []).filter(ii => ii.toLocaleLowerCase().includes(val.toLocaleLowerCase())).sort(),
    ),
  );

  setCurNode = rxNext_(this.curNode$);
  setCurType = rxNext_(this.curType$);
  setCurTag = rxNext_(this.curTag$);
  setCurVal = rxNext_(this.curVal$);

  ngOnDestroy() {}

  ngOnInit() {
    this.dbTypes$
      .pipe(
        withLatestFrom(this.curType$),
        filter(([vals, cur]) => vals.length > 0 && (!cur || !vals.includes(cur))),
        map(([vals]) => vals[0]),
      )
      .subscribe(this.setCurType);

    this.curTypeKeys$
      .pipe(
        withLatestFrom(this.curTag$),
        filter(([vals, cur]) => vals.length > 0 && (!cur || !vals.includes(cur))),
        map(([vals]) => vals[0]),
      )
      .subscribe(this.setCurTag);
  }

  tryQuery = (cmp = CMP_EQ) =>
    of([this.curType$.value, this.curTag$.value, this.curVal$.value])
      .pipe(
        filter(params => params.every(ii => !!ii && ii.length > 0)),
        map(([type, tag, val]) =>
          this.graphsky.query((nodes, _) => nodes.filter(ii => ii.data[TAG_TYPE] === type && compareEqual(cmp, ii.data[tag], val))),
        ),
        map(nodes => (nodes.length ? nodes[0] : null)),
      )
      .subscribe(this.setCurNode);
}
