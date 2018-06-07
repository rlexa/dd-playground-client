import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GraphskyService } from 'app/graphsky';
import { debounceTime, map } from 'rxjs/operators';
import { TypedNode } from './data';

@Component({
  selector: 'app-graph-walker',
  templateUrl: './graph-walker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphWalkerComponent {
  constructor(
    private readonly graphsky: GraphskyService,
  ) { }

  readonly dbState$ = this.graphsky.log$;
  readonly dbNodeTypeCount$ = this.graphsky.change$.pipe(debounceTime(200), map(() =>
    this.graphsky.query((nodes, _) =>
      nodes.reduce((acc, ii) => ({ ...acc, [(ii.data as TypedNode)._type]: (acc[(ii.data as TypedNode)._type] || 0) + 1 }), <{ [key: string]: number }>{}))
  ));
}
