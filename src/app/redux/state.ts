import { GameState, redGameState } from 'app/redux/game';
import { AnyAction, combineReducers, ReducersMapObject } from 'redux';
import { GlobalValues, redGlobalValues } from './globals';
import { redUiState, UiState } from './ui';

export const KEY_GAM = 'game';
export const KEY_GLO = 'globalValues';
export const KEY_UIS = 'ui';
export interface AppState {
  game: GameState,
  globalValues: GlobalValues,
  ui: UiState,
}

export const redAppState = combineReducers(<ReducersMapObject<AppState, AnyAction>>{
  [KEY_GAM]: redGameState,
  [KEY_GLO]: redGlobalValues,
  [KEY_UIS]: redUiState,
});
