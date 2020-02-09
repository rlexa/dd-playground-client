import {actor, initReduceAssemble$_, redMergeProperty_} from 'dd-rx-state';
import {SUFFIX} from './state-ui.suffix';

interface DashboardState {
  isVisibleFooter?: boolean;
  isVisibleHeader?: boolean;
  isVisibleSide?: boolean;
}

export interface UiState {
  dashboard?: DashboardState;
}

export const mergeDashboard = actor<DashboardState>('MERGE', SUFFIX, 'dashboard');

export const stateUi$ = initReduceAssemble$_<UiState>(
  {
    dashboard: {isVisibleFooter: true, isVisibleHeader: true, isVisibleSide: true},
  },
  {
    [mergeDashboard.type]: redMergeProperty_('dashboard'),
  },
);
