import {initReduceAssemble$_} from 'dd-rx-state';
import {GameDownState, stateGameDown$} from './state-game-down';

export interface GameState {
  down?: GameDownState;
}

export const stateGame$ = initReduceAssemble$_<GameState>({down: null}, null, {down: stateGameDown$});
