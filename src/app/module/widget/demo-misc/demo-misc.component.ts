import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {map} from 'rxjs/operators';
import {GraphskyService} from '../../service/graphsky-api';

@Component({
  selector: 'app-demo-misc',
  templateUrl: './demo-misc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GraphskyService],
})
export class DemoMiscComponent implements OnDestroy {
  constructor(private readonly graphsky: GraphskyService) {}

  readonly graphskyLog$ = this.graphsky.log$;
  readonly graphskyNodes$ = this.graphsky.nodeCount$;
  readonly graphskyAll$ = this.graphsky.change$.pipe(
    map(() =>
      this.graphsky.query((nodes, _) =>
        nodes
          .filter(node => 'name' in node.data)
          .sort((aa, bb) => aa.data.name.toString().localeCompare(bb.data.name.toString()))
          .reduce(
            (acc, node) => ({
              ...acc,
              [node.data.name.toString() + ' ' + node.data.sex.toString()]: node.out
                .map(link => link.data.relationship + ' ' + link.to.data.name)
                .join(', '),
            }),
            {},
          ),
      ),
    ),
  );
  readonly graphskyLiked$ = this.graphsky.change$.pipe(
    map(() =>
      this.graphsky.query((_, links) =>
        links
          .filter(link => link.data.relationship === 'likes')
          .map(link => link.to)
          .sort((aa, bb) => aa.data.name.toString().localeCompare(bb.data.name.toString()))
          .reduce(
            (acc, node) => ({
              ...acc,
              [node.data.name.toString()]: (acc[node.data.name.toString()] || 0) + 1,
            }),
            {},
          ),
      ),
    ),
  );
  readonly graphskyDiversity$ = this.graphsky.change$.pipe(
    map(() =>
      this.graphsky.query((nodes, _) =>
        nodes
          .filter(node => 'sex' in node.data)
          .reduce(
            (acc, node) => ({
              ...acc,
              [node.data.sex.toString()]: (acc[node.data.sex.toString()] || 0) + 1,
            }),
            {},
          ),
      ),
    ),
  );

  ngOnDestroy() {}

  graphskyAddTestData = () => {
    this.graphsky.add([
      {name: 'Alice', sex: 'f'},
      {name: 'Bob', sex: 'm'},
      {name: 'Clark', sex: 'm'},
      {name: 'Donnie', sex: 'm'},
    ]);
    this.graphsky.link([
      {fromNotExact: true, toNotExact: true, data: {relationship: 'likes'}, from: {name: 'Alice'}, to: {name: 'Bob'}},
      {fromNotExact: true, toNotExact: true, data: {relationship: 'likes'}, from: {name: 'Alice'}, to: {name: 'Clark'}},
      {fromNotExact: true, toNotExact: true, data: {relationship: 'likes'}, from: {name: 'Bob'}, to: {name: 'Clark'}},
      {fromNotExact: true, toNotExact: true, data: {relationship: 'likes'}, from: {name: 'Clark'}, to: {name: 'Donnie'}},
      {fromNotExact: true, toNotExact: true, data: {relationship: 'likes'}, from: {name: 'Donnie'}, to: {name: 'Alice'}},
    ]);
  };

  graphskyDrop = () => this.graphsky.drop();
}
