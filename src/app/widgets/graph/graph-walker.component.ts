import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { GraphskyService, IGraphskyNode } from 'app/graphsky';
import { BehaviorSubject, of } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { TypedNode } from './data';

@Component({
  selector: 'app-graph-walker',
  templateUrl: './graph-walker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphWalkerComponent implements OnDestroy, OnInit {
  constructor(
    private readonly graphsky: GraphskyService,
  ) { }

  readonly curType$ = new BehaviorSubject(<string>null);
  readonly curTag$ = new BehaviorSubject(<string>null);
  readonly curVal$ = new BehaviorSubject(<string>null);
  readonly curNode$ = new BehaviorSubject(<IGraphskyNode>null);

  readonly dbState$ = this.graphsky.log$;
  readonly dbNodeTypeCount$ = this.graphsky.change$.pipe(debounceTime(200), map(() =>
    this.graphsky.query((nodes, _) =>
      nodes.reduce((acc, ii) => ({ ...acc, [(ii.data as TypedNode)._type]: (acc[(ii.data as TypedNode)._type] || 0) + 1 }), <{ [key: string]: number }>{}))
  ));

  readonly dbTypes$ = this.dbNodeTypeCount$.pipe(map(val => Object.keys(val).sort()));

  ngOnDestroy() {
    [this.curType$].forEach(ii => ii.complete());
  }

  ngOnInit() {
    this.dbTypes$.subscribe(val => val.length && !this.curType$.value ? this.curType$.next(val[0]) : {});
  }

  tryQuery = () => of([this.curType$.value, this.curTag$.value, this.curVal$.value])
    .pipe(
      filter(params => params.every(ii => !!ii && ii.length > 0)),
      map(([type, tag, val]) => this.graphsky.query((nodes, _) => nodes.filter(ii => (ii.data as TypedNode)._type === type && ii.data[tag] === val))),
      map(nodes => nodes.length ? nodes[0] : null))
    .subscribe(node => this.curNode$.next(node));
}
