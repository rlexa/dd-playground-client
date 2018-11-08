import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { GraphskyService } from 'app/module/service/graphsky-api';
import { arrayFrom } from 'app/util';
import { RxCleanup } from 'dd-rxjs';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

const createSamplePoints = (range = 100) => arrayFrom(10 * 2).map(ii => Math.random() * range - range / 2)

@Component({
  selector: 'app-demo-misc',
  templateUrl: './demo-misc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GraphskyService],
})
export class DemoMiscComponent implements OnDestroy {
  constructor(private readonly graphsky: GraphskyService) { }

  private readonly samplePolynomPointsRange = 100;
  @RxCleanup() readonly samplePolynomPoints$ = new BehaviorSubject(createSamplePoints(this.samplePolynomPointsRange));
  transitionalPolynomPoint = [0, 0];

  readonly graphskyLog$ = this.graphsky.log$;
  readonly graphskyNodes$ = this.graphsky.nodeCount$;
  readonly graphskyAll$ = this.graphsky.change$.pipe(map(() => this.graphsky.query(
    (nodes, _) => nodes
      .filter(node => 'name' in node.data)
      .sort((aa, bb) => aa.data['name'].toString().localeCompare(bb.data['name'].toString()))
      .reduce((acc, node) => (
        {
          ...acc,
          [node.data['name'].toString() + ' ' + node.data['sex'].toString()]: node.out.map(link => link.data['relationship'] + ' ' + link.to.data['name']).join(', ')
        }), {})
  )));
  readonly graphskyLiked$ = this.graphsky.change$.pipe(map(() => this.graphsky.query(
    (_, links) => links
      .filter(link => link.data['relationship'] === 'likes')
      .map(link => link.to)
      .sort((aa, bb) => aa.data['name'].toString().localeCompare(bb.data['name'].toString()))
      .reduce((acc, node) => (
        {
          ...acc,
          [node.data['name'].toString()]: (acc[node.data['name'].toString()] || 0) + 1
        }), {})
  )));
  readonly graphskyDiversity$ = this.graphsky.change$.pipe(map(() => this.graphsky.query(
    (nodes, _) => nodes
      .filter(node => 'sex' in node.data)
      .reduce((acc, node) => (
        {
          ...acc,
          [node.data['sex'].toString()]: (acc[node.data['sex'].toString()] || 0) + 1
        }), {})
  )));

  ngOnDestroy() { }

  reSamplePolynomPoints = () => this.samplePolynomPoints$.next(createSamplePoints(this.samplePolynomPointsRange));

  graphskyAddTestData = () => {
    this.graphsky.add([{ name: 'Alice', sex: 'f' }, { name: 'Bob', sex: 'm' }, { name: 'Clark', sex: 'm' }, { name: 'Donnie', sex: 'm' }]);
    this.graphsky.link([
      { fromNotExact: true, toNotExact: true, data: { relationship: 'likes' }, from: { name: 'Alice' }, to: { name: 'Bob' } },
      { fromNotExact: true, toNotExact: true, data: { relationship: 'likes' }, from: { name: 'Alice' }, to: { name: 'Clark' } },
      { fromNotExact: true, toNotExact: true, data: { relationship: 'likes' }, from: { name: 'Bob' }, to: { name: 'Clark' } },
      { fromNotExact: true, toNotExact: true, data: { relationship: 'likes' }, from: { name: 'Clark' }, to: { name: 'Donnie' } },
      { fromNotExact: true, toNotExact: true, data: { relationship: 'likes' }, from: { name: 'Donnie' }, to: { name: 'Alice' } },
    ]);
  }

  graphskyDrop = () => this.graphsky.drop();
}
