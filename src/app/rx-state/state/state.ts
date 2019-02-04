import { initReduceAssemble$_ } from 'dd-rx-state';
import { GameState, state_game$ } from './state-game';
import { GlobalValues, state_global$ } from './state-global';
import { state_ui$, UiState } from './state-ui';

export interface AppState {
  game?: GameState,
  globalValues?: GlobalValues,
  ui?: UiState,
}

export const state$ = initReduceAssemble$_(
  <AppState>{
    game: null,
    globalValues: null,
    ui: null,
  },
  null,
  {
    game: state_game$,
    globalValues: state_global$,
    ui: state_ui$,
  });
