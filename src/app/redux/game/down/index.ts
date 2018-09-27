import { ActionValue, action_, reduceSet, reduce_ } from 'app/redux/util';
import { isEqualValue } from 'app/util';
import { AnyAction, combineReducers, ReducersMapObject } from 'redux';
import { INTERFIX } from './parent';

// STATE

export const GAME_DOWN_FIELD_H = 8;
export const GAME_DOWN_FIELD_W = 8;
export const GAME_DOWN_FIELD_Q = GAME_DOWN_FIELD_H * GAME_DOWN_FIELD_W;

export interface GameDownStateField {
  field: string,
}

export interface GameDownStateFields { [key: number]: GameDownStateField }

const KEY_GDS_FIE = 'fields';
const KEY_GDS_THE = 'theme';
export interface GameDownStateScene {
  fields: GameDownStateFields,
  theme: string,
}

const KEY_FIV = 'fieldValues';
const KEY_SCE = 'scene';
const KEY_THV = 'themeValues';
export interface GameDownState {
  fieldValues: string[],
  scene: GameDownStateScene,
  themeValues: string[],
}

// DEFAULTS

export const FieldValueGround = 'ground';
export const FieldValueWater = 'water';
export const DEF_FieldValues = [FieldValueGround, FieldValueWater];
export const DEF_Field = FieldValueGround;

export const ThemeValueGreen = 'green';
export const ThemeValueWhite = 'white';
export const DEF_ThemeValues = [ThemeValueGreen, ThemeValueWhite];
export const DEF_Theme = ThemeValueGreen;

export const DEF_GameDownStateField = Object.freeze(<GameDownStateField>{
  field: DEF_Field,
});

export const DEF_GameDownStateFields: GameDownStateFields = Object.freeze(
  Array.from(Array(GAME_DOWN_FIELD_Q)).reduce((acc, _, index) => ({ ...acc, [index]: DEF_GameDownStateField }), {})
);

// ACTION

const actions = {
  SET_FIV: 'SET_' + INTERFIX + '_FIELD_VALUES',
  SET_SCE_FIE: 'SET_' + INTERFIX + '_' + KEY_SCE + '_' + KEY_GDS_FIE + '_FIELD',
  SET_SCE_FIS: 'SET_' + INTERFIX + '_' + KEY_SCE + '_' + KEY_GDS_FIE + '_FIELDS',
  SET_SCE_THE: 'SET_' + INTERFIX + '_' + KEY_SCE + '_' + KEY_GDS_THE + '_THEME',
  SET_THV: 'SET_' + INTERFIX + '_THEME_VALUES',
}

interface IndexValue<T> { index: number, value: T }

export const actSetGameDownFieldValues = action_<string[]>(actions.SET_FIV);
export const actSetGameDownStateSceneField = action_<IndexValue<GameDownStateField>>(actions.SET_SCE_FIE);
export const actSetGameDownStateSceneFields = action_<GameDownStateFields>(actions.SET_SCE_FIS);
export const actSetGameDownStateSceneTheme = action_<string>(actions.SET_SCE_THE);
export const actSetGameDownThemeValues = action_<string[]>(actions.SET_THV);

// REDUCER

const reduceSetOverwriteIndexed = <T>(state: { [key: number]: T }, action: ActionValue<IndexValue<T>>) => {
  if (!action.value || !(action.value.index in state) || !action.value.value || isEqualValue(state[action.value.index], action.value.value)) {
    return state;
  }
  return Object.freeze({ ...state, [action.value.index]: Object.freeze(action.value.value) });
}

export const redGameDownState = combineReducers(<ReducersMapObject<GameDownState, AnyAction>>{
  [KEY_FIV]: reduce_(Object.freeze(DEF_FieldValues), { [actions.SET_FIV]: reduceSet }),
  [KEY_SCE]: combineReducers(<ReducersMapObject<GameDownStateScene, AnyAction>>
    {
      [KEY_GDS_FIE]: reduce_(DEF_GameDownStateFields,
        {
          [actions.SET_SCE_FIS]: reduceSet,
          [actions.SET_SCE_FIE]: reduceSetOverwriteIndexed,
        }),
      [KEY_GDS_THE]: reduce_(DEF_Theme, { [actions.SET_SCE_THE]: reduceSet }),
    }),
  [KEY_THV]: reduce_(Object.freeze(DEF_ThemeValues), { [actions.SET_THV]: reduceSet }),
});
