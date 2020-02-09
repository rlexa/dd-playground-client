import {Injectable, OnDestroy} from '@angular/core';
import {Graphsky} from './graphsky';

@Injectable()
export class GraphskyService extends Graphsky implements OnDestroy {
  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
