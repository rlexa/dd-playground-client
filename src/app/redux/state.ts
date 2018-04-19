import { combineReducers } from 'redux';
import { GlobalValues, redGlobalValues } from './globals';
import { UiState, redUiState } from './ui';

export const KEY_GLO = 'globalValues';
export const KEY_UIS = 'ui';
export interface AppState {
  globalValues: GlobalValues;
  ui: UiState;
}

export const redAppState = combineReducers<AppState>({
  [KEY_GLO]: redGlobalValues,
  [KEY_UIS]: redUiState
});
