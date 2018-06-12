import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { GraphskyService, IGraphskyNode } from 'app/graphsky';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { debounceTime, filter, map, tap } from 'rxjs/operators';
import { TAG_TYPE } from './data';

@Component({
  selector: 'app-graph-walker',
  templateUrl: './graph-walker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphWalkerComponent implements OnDestroy, OnInit {
  constructor(
    private readonly graphsky: GraphskyService,
  ) { }

  readonly GRID_FROM = 'from';
  readonly GRID_CURRENT = 'current';
  readonly GRID_TO = 'to';
  readonly GRID = [[this.GRID_FROM, this.GRID_CURRENT, this.GRID_TO]]
    .map(line => '"' + line.join(' ') + '"').join(' ');
  readonly GRID_SIZE = '1fr auto 1fr';

  readonly curType$ = new BehaviorSubject(<string>null);
  readonly curTag$ = new BehaviorSubject(<string>null);
  readonly curVal$ = new BehaviorSubject(<string>null);
  readonly curNode$ = new BehaviorSubject(<IGraphskyNode>null);

  readonly dbState$ = this.graphsky.log$;
  readonly dbNodeTypeCount$ = this.graphsky.change$.pipe(debounceTime(200), map(() =>
    this.graphsky.query((nodes, _) =>
      nodes.reduce((acc, ii) => ({ ...acc, [ii.data[TAG_TYPE] as string]: (acc[ii.data[TAG_TYPE] as string] || 0) + 1 }), <{ [key: string]: number }>{}))
  ));

  readonly dbTypes$ = this.dbNodeTypeCount$.pipe(map(val => Object.keys(val).sort()));
  readonly curTypeFirstNode$ = this.curType$.pipe(
    filter(type => !!type && type.length > 0),
    map(type => this.graphsky.query((nodes, _) => nodes.find(ii => ii.data[TAG_TYPE] === type))));
  readonly curTypeKeys$ = this.curTypeFirstNode$.pipe(
    map(node => node ? Object.keys(node.data).filter(ii => ii !== TAG_TYPE) : []));
  readonly curTypeKeysFiltered$ = combineLatest(this.curTag$, this.curTypeKeys$).pipe(
    map(([tag, keys]) => !tag || !tag.length ? keys || [] : (keys || []).filter(ii => ii.toLocaleLowerCase().includes(tag.toLocaleLowerCase())).sort()));
  readonly curTypeKeyTagValues$ = combineLatest(this.curType$, this.curTypeKeys$, this.curTag$).pipe(
    map(([type, keys, tag]) => !type || !keys || !keys.includes(tag) ? [] :
      this.graphsky.query((nodes, _) => nodes
        .filter(ii => ii.data[TAG_TYPE] === type && tag in ii.data && ii.data[tag] !== null && ii.data[tag] !== undefined)
        .map(ii => ii.data[tag].toString())
        .reduce((acc, ii) => acc.includes(ii) ? acc : [...acc, ii], <string[]>[])
        .sort())),
    tap(ii => console.log(ii)));
  readonly curTypeKeyTagValuesFiltered$ = combineLatest(this.curVal$, this.curTypeKeyTagValues$).pipe(
    map(([val, vals]) => !val || !val.length ? vals || [] : (vals || []).filter(ii => ii.toLocaleLowerCase().includes(val.toLocaleLowerCase())).sort()));

  ngOnDestroy() {
    [
      this.curNode$,
      this.curTag$,
      this.curType$,
      this.curVal$,
    ].forEach(ii => ii.complete());
  }

  ngOnInit() {
    this.dbTypes$
      .pipe(
        filter(vals => vals.length > 0 && (!this.curType$.value || !this.curType$.value.length)),
        map(types => types[0]))
      .subscribe(val => this.curType$.next(val));

    this.curTypeKeys$
      .pipe(
        filter(vals => vals.length > 0 && (!this.curTag$.value || !this.curTag$.value.length)),
        map(vals => vals[0]))
      .subscribe(val => this.curTag$.next(val));
  }

  tryQuery = () => of([this.curType$.value, this.curTag$.value, this.curVal$.value])
    .pipe(
      filter(params => params.every(ii => !!ii && ii.length > 0)),
      map(([type, tag, val]) => this.graphsky.query((nodes, _) => nodes.filter(ii => ii.data[TAG_TYPE] === type && ii.data[tag] === val))),
      map(nodes => nodes.length ? nodes[0] : null))
    .subscribe(node => this.curNode$.next(node));
}
