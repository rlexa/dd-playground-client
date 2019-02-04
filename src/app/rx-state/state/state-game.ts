import { initReduceAssemble$_ } from 'dd-rx-state';
import { GameDownState, state_game_down$ } from './state-game-down';

export interface GameState {
  down?: GameDownState,
}

export const state_game$ = initReduceAssemble$_(
  <GameState>{ down: null },
  null,
  { down: state_game_down$ },
);
