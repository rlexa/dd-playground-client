import { IActionValue, createReducer, redMergeValue } from 'app/redux/util';
import { combineReducers } from 'redux';
import { UiAiState, redUiAiState } from './ai';

// STATE

export interface DashboardState {
  isVisibleFooter?: boolean;
  isVisibleHeader?: boolean;
  isVisibleSide?: boolean;
}

const KEY_AI_STATE = 'ai';
const KEY_DASHBOARD = 'dashboard';
export interface UiState {
  ai?: UiAiState;
  dashboard: DashboardState;
}

// ACTION

const uiActions = {
  mergeDashboard: 'MERGE_DASHBOARD'
}

export const actMergeDashboard = (value: DashboardState) => <IActionValue<DashboardState>>{ type: uiActions.mergeDashboard, value };

// REDUCER

export const redUiState = combineReducers<UiState>({
  [KEY_AI_STATE]: redUiAiState,
  [KEY_DASHBOARD]: createReducer(Object.freeze(<DashboardState>
    {
      isVisibleFooter: true,
      isVisibleHeader: true,
      isVisibleSide: true
    }), {
      [uiActions.mergeDashboard]: redMergeValue
    }
  )
});
