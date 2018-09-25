import { AnyAction, combineReducers, ReducersMapObject } from 'redux';
import { GlobalValues, redGlobalValues } from './globals';
import { redUiState, UiState } from './ui';

export const KEY_GLO = 'globalValues';
export const KEY_UIS = 'ui';
export interface AppState {
  globalValues: GlobalValues;
  ui: UiState;
}

export const redAppState = combineReducers(<ReducersMapObject<AppState, AnyAction>>{
  [KEY_GLO]: redGlobalValues,
  [KEY_UIS]: redUiState,
});
