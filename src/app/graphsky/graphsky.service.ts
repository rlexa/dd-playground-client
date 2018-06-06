import { Graphsky } from './graphsky';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class GraphskyService extends Graphsky implements OnDestroy {
  ngOnDestroy() { this.destroy(); }
}
