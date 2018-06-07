import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GraphskyService } from 'app/graphsky';
import { map, tap } from 'rxjs/operators';
import { TypedNode } from './data';

const csvToObjects = (type: string, csv: string, separator = ';') => {
  const ret = <TypedNode[]>[];
  const lines = csv.split('\n').map(ii => ii.trim()).filter(ii => ii.length);
  if (lines.length > 1) {
    const cols = lines.splice(0, 1)[0].split(separator).map(ii => ii.trim());
    lines.forEach(line => ret.push(
      line.split(separator).reduce((acc, ii, index) => ({ ...acc, [cols[index]]: ii }), { _type: type })));
  }
  return ret;
}

@Component({
  selector: 'app-graph-top-level',
  templateUrl: './graph-top-level.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GraphskyService],
})
export class GraphTopLevelComponent implements OnInit {
  constructor(
    private readonly graphsky: GraphskyService,
    private readonly http: HttpClient,
  ) { }

  ngOnInit() {
    ['country'].forEach(type =>
      this.http
        .get(`/assets/graph-data/${type}.csv`, { responseType: 'text', headers: { 'content-type': 'text/plain;charset=utf-8' } })
        .pipe(map(csv => csvToObjects(type, csv)), tap(items => console.log(`...adding ${items.length} items of: ${type}`)))
        .subscribe(items => this.graphsky.add(items)));
  }
}
