import { createAction, createReducer, redMergeValue } from 'app/redux/util';
import { combineReducers } from 'redux';
import { UiAiState, redUiAiState } from './ai';
import { INTERFIX } from './parent';

// STATE

export interface DashboardState {
  isVisibleFooter?: boolean;
  isVisibleHeader?: boolean;
  isVisibleSide?: boolean;
}

const KEY_AIS = 'ai';
const KEY_DAS = 'dashboard';
export interface UiState {
  ai?: UiAiState;
  dashboard: DashboardState;
}

// ACTION

const actions = {
  MRG_DAS: 'MRG_' + INTERFIX + '_DASHBOARD',
}

export const actMergeUiDashboard = createAction<DashboardState>(actions.MRG_DAS);

// REDUCER

export const redUiState = combineReducers<UiState>({
  [KEY_AIS]: redUiAiState,
  [KEY_DAS]: createReducer(Object.freeze(<DashboardState>{ isVisibleFooter: true, isVisibleHeader: true, isVisibleSide: true }), { [actions.MRG_DAS]: redMergeValue })
});
