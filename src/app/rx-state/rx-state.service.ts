import { Inject, Injectable, OnDestroy } from '@angular/core';
import { RxState, Store } from 'dd-rx-state';
import { AppState } from './state';
import { AppRxStore } from './store';

@Injectable({ providedIn: 'root' })
export class RxStateService extends RxState<AppState> implements OnDestroy {
  constructor(@Inject(AppRxStore) protected readonly store: Store<AppState>) {
    super(store);
  }

  ngOnDestroy() {
    this.destroy();
  }
}
