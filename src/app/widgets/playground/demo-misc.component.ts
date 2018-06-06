import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GraphskyQuery, GraphskyService } from 'app/graphsky';
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
  readonly graphskyAll$ = this.graphsky.change$.pipe(map(() => this.graphsky.query()));

  reSamplePolynomPoints = () => this.samplePolynomPoints$.next(createSamplePoints(this.samplePolynomPointsRange));

  graphskyAddRandom = () => this.graphsky.add([{ tag: 'TAG_' + Math.floor(Math.random() * 15), nr: Math.round(Math.random() * 100) }]);

  graphskyDelRandom = () => of(this.graphsky.query(new GraphskyQuery().alias('all')))
    .pipe(
      map(result => result['all'].nodes),
      filter(nodes => nodes.length > 0),
      map(nodes => nodes[Math.floor(Math.random() * nodes.length)].data))
    .subscribe(data => this.graphsky.remove([data]));

  graphskyDrop = () => this.graphsky.drop();
}
