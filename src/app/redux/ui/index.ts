import { action_, reduceMrg, reduce_ } from 'app/redux/util';
import { AnyAction, combineReducers, ReducersMapObject } from 'redux';
import { redUiAiState, UiAiState } from './ai';
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

export const actMergeUiDashboard = action_<DashboardState>(actions.MRG_DAS);

// REDUCER

export const redUiState = combineReducers(<ReducersMapObject<UiState, AnyAction>>{
  [KEY_AIS]: redUiAiState,
  [KEY_DAS]: reduce_(Object.freeze(<DashboardState>{ isVisibleFooter: true, isVisibleHeader: true, isVisibleSide: true }), { [actions.MRG_DAS]: reduceMrg }),
});
