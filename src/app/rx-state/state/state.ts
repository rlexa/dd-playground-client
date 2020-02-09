import {initReduceAssemble$_} from 'dd-rx-state';
import {GameState, stateGame$} from './state-game';
import {GlobalValues, stateGlobal$} from './state-global';
import {stateUi$, UiState} from './state-ui';

export interface AppState {
  game?: GameState;
  globalValues?: GlobalValues;
  ui?: UiState;
}

export const state$ = initReduceAssemble$_<AppState>(
  {
    game: null,
    globalValues: null,
    ui: null,
  },
  null,
  {
    game: stateGame$,
    globalValues: stateGlobal$,
    ui: stateUi$,
  },
);
