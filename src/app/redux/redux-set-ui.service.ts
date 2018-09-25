import { Inject, Injectable } from '@angular/core';
import { actMergeUiDashboard, DashboardState } from 'app/redux/ui';
import { Store } from 'redux';
import { ReduxMutator } from './redux-mutator';
import { AppState } from './state';
import { AppStore } from './store';

@Injectable({ providedIn: 'root' })
export class ReduxSetUiService extends ReduxMutator {
  constructor(@Inject(AppStore) private readonly store: Store<AppState>, ) { super(store.dispatch); }
  private state = () => this.store.getState().ui;
  mergeDashboardState = (val: DashboardState) => this.dispatch(actMergeUiDashboard(val));
}
