import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {map} from 'rxjs/operators';
import {FlexboxDirective} from '../../directive/flexbox';
import {GraphskyService} from '../../service/graphsky-api';
import {SimpleViewComponent} from '../../widget/simple-view';

@Component({
  selector: 'app-demo-misc',
  templateUrl: './demo-misc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, FlexboxDirective, SimpleViewComponent],
  providers: [GraphskyService],
})
export class DemoMiscComponent {
  private readonly graphsky = inject(GraphskyService);

  readonly graphskyLog$ = this.graphsky.log$;
  readonly graphskyNodes$ = this.graphsky.nodeCount$;
  readonly graphskyAll$ = this.graphsky.change$.pipe(
    map(() =>
      this.graphsky.query((nodes, _) =>
        nodes
          .filter((node) => 'name' in node.data)
          .sort((aa, bb) => aa.data.name.toString().localeCompare(bb.data.name.toString()))
          .reduce(
            (acc, node) => ({
              ...acc,
              [node.data.name.toString() + ' ' + node.data.sex.toString()]: node.out
                .map((link) => link.data.relationship + ' ' + link.to.data.name)
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
          .filter((link) => link.data.relationship === 'likes')
          .map((link) => link.to)
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
          .filter((node) => 'sex' in node.data)
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
