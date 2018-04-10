import { Action, ActionCreator, Reducer, combineReducers } from 'redux';
import { IActionValue, createReducer, redSetValue, redMergeValue } from '../util';

// STATE

export interface DashboardState {
  isVisibleFooter?: boolean;
  isVisibleHeader?: boolean;
  isVisibleSide?: boolean;
}

const KEY_DASHBOARD = 'dashboard';
export interface UiState {
  dashboard: DashboardState;
}

// ACTION

const uiActions = {
  mergeDashboard: 'MERGE_DASHBOARD'
}

export const actMergeDashboard = (value: DashboardState) => <IActionValue<DashboardState>>{ type: uiActions.mergeDashboard, value };

// REDUCER

export const redUiState = combineReducers<UiState>({
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
