import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GraphskyService } from 'app/graphsky';
import { arrayFrom } from 'app/util';
import { BehaviorSubject, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

const createSamplePoints = (range = 100) => arrayFrom(10 * 2).map(ii => Math.random() * range - range / 2)

@Component({
  selector: 'app-demo-misc',
  templateUrl: './demo-misc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GraphskyService],
})
export class DemoMiscComponent {
  constructor(private readonly graphsky: GraphskyService) { }

  private readonly samplePolynomPointsRange = 100;
  readonly samplePolynomPoints$ = new BehaviorSubject(createSamplePoints(this.samplePolynomPointsRange));
  transitionalPolynomPoint = [0, 0];

  readonly graphskyLog$ = this.graphsky.log$;
  readonly graphskyNodes$ = this.graphsky.nodeCount$;
  readonly graphskyAll$ = this.graphsky.change$.pipe(map(() => this.graphsky.query(
    (nodes, links) => nodes
      .filter(node => 'name' in node.data)
      .reduce((acc, node) => (
        {
          ...acc,
          [node.data['name'].toString()]: node.out.map(link => link.data['relationship'] + ' ' + link.to.data['name']).join(', ')
        }), {})
  )));

  reSamplePolynomPoints = () => this.samplePolynomPoints$.next(createSamplePoints(this.samplePolynomPointsRange));

  graphskyAddTestData = () => {
    this.graphsky.add([{ name: 'Alice' }, { name: 'Bob' }, { name: 'Clark' }, { name: 'Donnie' }]);
    this.graphsky.link([
      { from: { name: 'Alice' }, to: { name: 'Bob' }, data: { relationship: 'likes' } },
      { from: { name: 'Alice' }, to: { name: 'Clark' }, data: { relationship: 'likes' } },
      { from: { name: 'Bob' }, to: { name: 'Donnie' }, data: { relationship: 'hates' } }]);
  }

  graphskyAddRandom = () => this.graphsky.add([{ tag: 'TAG_' + Math.floor(Math.random() * 15), nr: Math.round(Math.random() * 100) }]);

  graphskyDelRandom = () => of(this.graphsky.query(nodes => nodes.map(ii => ii.data)))
    .pipe(
      filter(nodes => nodes.length > 0),
      map(nodes => nodes[Math.floor(Math.random() * nodes.length)]))
    .subscribe(data => this.graphsky.remove([data]));

  graphskyDrop = () => this.graphsky.drop();
}
