import { action_, reduceSet, reduce_ } from 'app/redux/util';
import { AnyAction, combineReducers, ReducersMapObject } from 'redux';
import { INTERFIX } from './parent';

// STATE

export const GAME_DOWN_FIELD_H = 8;
export const GAME_DOWN_FIELD_W = 8;
export const GAME_DOWN_FIELD_Q = GAME_DOWN_FIELD_H * GAME_DOWN_FIELD_W;

export type TYPE_THEME = 'green';
export type TYPE_FIELD = 'water' | 'ground';

export interface GameDownStateField {
  field: TYPE_FIELD,
}

export interface GameDownStateFields { [key: number]: GameDownStateField }

const KEY_GDS_FIE = 'fields';
const KEY_GDS_THE = 'theme';
export interface GameDownStateScene {
  fields: GameDownStateFields,
  theme: TYPE_THEME,
}

const KEY_SCE = 'scene';
export interface GameDownState {
  scene: GameDownStateScene,
}

// DEFAULTS

export const DEF_TYPE_FIELD = <TYPE_FIELD>'ground';

export const DEF_GameDownStateField = Object.freeze(<GameDownStateField>{
  field: DEF_TYPE_FIELD,
});

export const DEF_GameDownStateFields: GameDownStateFields = Object.freeze(
  Array.from(Array(GAME_DOWN_FIELD_Q)).reduce((acc, _, index) => ({ ...acc, [index]: DEF_GameDownStateField }), {})
);

export const DEF_TYPE_THEME = <TYPE_THEME>'green';

// ACTION

const actions = {
  SET_GDS_SCE_FIE: 'SET_' + INTERFIX + '_' + KEY_SCE + '_' + KEY_GDS_FIE + '_FIELDS',
  SET_GDS_SCE_THE: 'SET_' + INTERFIX + '_' + KEY_SCE + '_' + KEY_GDS_THE + '_THEME',
}

export const actSetGameDownStateSceneFields = action_<GameDownStateFields>(actions.SET_GDS_SCE_FIE);
export const actSetGameDownStateSceneTheme = action_<TYPE_THEME>(actions.SET_GDS_SCE_THE);

// REDUCER

export const redGameDownState = combineReducers(<ReducersMapObject<GameDownState, AnyAction>>{
  [KEY_SCE]: combineReducers(<ReducersMapObject<GameDownStateScene, AnyAction>>
    {
      [KEY_GDS_FIE]: reduce_(DEF_GameDownStateFields, { [actions.SET_GDS_SCE_FIE]: reduceSet }),
      [KEY_GDS_THE]: reduce_(DEF_TYPE_THEME, { [actions.SET_GDS_SCE_THE]: reduceSet }),
    }),
});
