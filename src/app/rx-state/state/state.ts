import {initReduceAssemble$_} from 'dd-rx-state';
import {GameState, stateGame$} from './state-game';

export interface AppState {
  game?: GameState;
}

export const state$ = initReduceAssemble$_<AppState>(
  {
    game: null,
  },
  null,
  {
    game: stateGame$,
  },
);
