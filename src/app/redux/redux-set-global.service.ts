import { Inject, Injectable } from '@angular/core';
import { actMergeGlobalFlags, actSetGlobalRoute, GlobalFlags } from 'app/redux/globals';
import { Store } from 'redux';
import { ReduxMutator } from './redux-mutator';
import { AppState } from './state';
import { AppStore } from './store';

@Injectable({ providedIn: 'root' })
export class ReduxSetGlobalService extends ReduxMutator {
  constructor(@Inject(AppStore) private readonly store: Store<AppState>, ) { super(store.dispatch); }
  private state = () => this.store.getState().globalValues;
  mergeFlags = (val: GlobalFlags) => this.dispatch(actMergeGlobalFlags(val));
  setRoute = (val: string) => this.do(this.state().route, Object.freeze(val), actSetGlobalRoute);
}
