import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GraphskyService, IGraphskyData, IGraphskyLinkRequest } from 'app/module/service/graphsky-api';
import { TAG_TYPE } from 'app/module/widget/graph-walker';
import { map, tap } from 'rxjs/operators';

interface TypedNode extends IGraphskyData {
  [TAG_TYPE]: string;
}

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

const csvToLinks = (csv: string, separator = ';', fromPrefix = 'from-', toPrefix = 'to-') => {
  const ret = <IGraphskyLinkRequest[]>[];
  const lines = csv.split('\n').map(ii => ii.trim()).filter(ii => ii.length);
  if (lines.length > 1) {
    const cols = lines.splice(0, 1)[0].split(separator).map(ii => ii.trim());
    lines.forEach(line => ret.push(
      line.split(separator).reduce((acc, ii, index) => {
        const col = cols[index];
        if (col.startsWith(fromPrefix)) {
          acc.from[col.substr(fromPrefix.length)] = ii;
        } else if (col.startsWith(toPrefix)) {
          acc.to[col.substr(toPrefix.length)] = ii;
        } else {
          acc.data[col] = ii;
        }
        return acc;
      }, <IGraphskyLinkRequest>{ fromNotExact: true, toNotExact: true, data: {}, from: {}, to: {} })));
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
    [
      'country',
      'institution',
    ].forEach(source => this.http
      .get(`/assets/graph-data/${source}.csv`, { responseType: 'text', headers: { 'content-type': 'text/plain;charset=utf-8' } })
      .pipe(map(csv => csvToObjects(source, csv)), tap(items => console.log(`...adding ${items.length} items of: ${source}`)))
      .subscribe(items => this.graphsky.add(items)));

    [
      'country-institution',
    ].forEach(source => this.http
      .get(`/assets/graph-data/link-${source}.csv`, { responseType: 'text', headers: { 'content-type': 'text/plain;charset=utf-8' } })
      .pipe(map(csv => csvToLinks(csv)), tap(items => console.log(`...adding ${items.length} links of: ${source}`)))
      .subscribe(items => this.graphsky.link(items)));
  }
}
