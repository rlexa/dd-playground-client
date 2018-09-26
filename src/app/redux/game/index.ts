import { GameDownState, redGameDownState } from 'app/redux/game/down';
import { AnyAction, combineReducers, ReducersMapObject } from 'redux';

// STATE

const KEY_DOW = 'down';
export interface GameState {
  down?: GameDownState;
}

// REDUCER

export const redGameState = combineReducers(<ReducersMapObject<GameState, AnyAction>>{
  [KEY_DOW]: redGameDownState,
});
