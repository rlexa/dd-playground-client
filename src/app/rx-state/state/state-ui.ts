import { actor, initReduceAssemble$_, redMergeProperty_ } from 'dd-rx-state';
import { AiState, state_ai$ } from './state-ai';
import { SUFFIX } from './state-ui.suffix';

interface DashboardState {
  isVisibleFooter?: boolean,
  isVisibleHeader?: boolean,
  isVisibleSide?: boolean,
}

export interface UiState {
  ai?: AiState,
  dashboard?: DashboardState,
}

export const merge_dashboard = actor<DashboardState>('MERGE', SUFFIX, 'dashboard');

export const state_ui$ = initReduceAssemble$_(
  <UiState>{
    ai: null,
    dashboard: { isVisibleFooter: true, isVisibleHeader: true, isVisibleSide: true },
  },
  {
    [merge_dashboard.type]: redMergeProperty_('dashboard'),
  },
  {
    ai: state_ai$,
  }
);
