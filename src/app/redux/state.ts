import { combineReducers } from 'redux';
import { GlobalValues, redGlobalValues } from './globals';
import { UiState, redUiState } from './ui';

export const KEY_GLOBALVALUES = 'globalValues';
export const KEY_UI = 'ui';
export interface AppState {
  globalValues: GlobalValues;
  ui: UiState;
}

export const redAppState = combineReducers<AppState>({
  [KEY_GLOBALVALUES]: redGlobalValues,
  [KEY_UI]: redUiState
});
