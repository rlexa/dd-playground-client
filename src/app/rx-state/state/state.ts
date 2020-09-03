import {initReduceAssemble$_} from 'dd-rx-state';
import {GameState, stateGame$} from './state-game';
import {GlobalValues, stateGlobal$} from './state-global';

export interface AppState {
  game?: GameState;
  globalValues?: GlobalValues;
}

export const state$ = initReduceAssemble$_<AppState>(
  {
    game: null,
    globalValues: null,
  },
  null,
  {
    game: stateGame$,
    globalValues: stateGlobal$,
  },
);
