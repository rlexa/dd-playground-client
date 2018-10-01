import { StringToString, Theme, THEME_MISSING } from 'app/game';
import { ActionValue, action_, reduceSet, reduce_ } from 'app/redux/util';
import { isEqualValue } from 'app/util';
import { AnyAction, combineReducers, ReducersMapObject } from 'redux';
import { INTERFIX } from './parent';

// THEME

export interface GameDownColorMap extends StringToString {
  fieldBackground: string,
  fieldGround: string,
  fieldWater: string,
}

// STATE

export interface GameDownStateField {
  field: string,
}

export interface GameDownStateFields { [key: number]: GameDownStateField }

const KEY_SCE_FAC = 'factor';
const KEY_SCE_FIE = 'fields';
const KEY_SCE_FMA = 'factorMax';
const KEY_SCE_FMI = 'factorMin';
const KEY_SCE_HOV = 'hoveredIndex';
const KEY_SCE_REN = 'renderer';
const KEY_SCE_SEL = 'selectedIndex';
const KEY_SCE_THE = 'theme';
export interface GameDownStateScene {
  factor: number,
  factorMax: number,
  factorMin: number,
  fields: GameDownStateFields,
  hoveredIndex: number,
  renderer: string,
  selectedIndex: number,
  theme: string,
}

const KEY_FIV = 'fieldValues';
const KEY_REN = 'rendererValues';
const KEY_SCE = 'scene';
const KEY_THE = 'themes';
const KEY_VID = 'viewDebug';
export interface GameDownState {
  fieldValues: string[],
  rendererValues: string[],
  scene: GameDownStateScene,
  themes: Theme<GameDownColorMap>[],
  viewDebug: boolean,
}

// DEFAULTS

export const GAME_DOWN_FIELD_H = 8;
export const GAME_DOWN_FIELD_W = 8;
export const GAME_DOWN_FIELD_Q = GAME_DOWN_FIELD_H * GAME_DOWN_FIELD_W;

export const DEF_SceneFactor = 1;

export const FIELD_GROUND = 'ground';
export const FIELD_WATER = 'water';
export const DEF_FieldValues = [FIELD_GROUND, FIELD_WATER];
export const DEF_Field = FIELD_GROUND;

export const DEF_GameDownStateField = Object.freeze(<GameDownStateField>{
  field: DEF_Field,
});

export const DEF_GameDownStateFields: GameDownStateFields = Object.freeze(
  Array.from(Array(GAME_DOWN_FIELD_Q)).reduce((acc, _, index) => ({ ...acc, [index]: DEF_GameDownStateField }), {})
);

export const RENDERER_SIMPLE = 'simple';
export const DEF_Renderer = RENDERER_SIMPLE;
export const DEF_RendererValues = Object.freeze([RENDERER_SIMPLE]);

// ACTION

const actions = {
  SET_FIV: 'SET_' + INTERFIX + '_FIELD_VALUES',
  SET_SCE_FAC: 'SET_' + INTERFIX + '_' + KEY_SCE + '_FACTOR',
  SET_SCE_FIE: 'SET_' + INTERFIX + '_' + KEY_SCE + '_FIELD',
  SET_SCE_FIS: 'SET_' + INTERFIX + '_' + KEY_SCE + '_FIELDS',
  SET_SCE_HOV: 'SET_' + INTERFIX + '_' + KEY_SCE + '_HOVERED',
  SET_SCE_REN: 'SET_' + INTERFIX + '_' + KEY_SCE + '_RENDERER',
  SET_SCE_SEL: 'SET_' + INTERFIX + '_' + KEY_SCE + '_SELECTED',
  SET_SCE_THE: 'SET_' + INTERFIX + '_' + KEY_SCE + '_THEME',
  SET_THE: 'SET_' + INTERFIX + '_THEMES',
  SET_VID: 'SET_' + INTERFIX + '_VIEW_DEBUG',
}

export interface IndexValue<T> { index: number, value: T }

export const actSetGameDownFieldValues = action_<string[]>(actions.SET_FIV);
export const actSetGameDownStateSceneFactor = action_<number>(actions.SET_SCE_FAC);
export const actSetGameDownStateSceneField = action_<IndexValue<GameDownStateField>>(actions.SET_SCE_FIE);
export const actSetGameDownStateSceneFields = action_<GameDownStateFields>(actions.SET_SCE_FIS);
export const actSetGameDownStateSceneHoveredIndex = action_<number>(actions.SET_SCE_HOV);
export const actSetGameDownStateSceneRenderer = action_<string>(actions.SET_SCE_REN);
export const actSetGameDownStateSceneSelectedIndex = action_<number>(actions.SET_SCE_SEL);
export const actSetGameDownStateSceneTheme = action_<string>(actions.SET_SCE_THE);
export const actSetGameDownThemes = action_<Theme<GameDownColorMap>[]>(actions.SET_THE);
export const actSetGameDownViewDebug = action_<boolean>(actions.SET_VID);

// REDUCER

const reduceSetOverwriteIndexed = <T>(state: { [key: number]: T }, action: ActionValue<IndexValue<T>>) => {
  if (!action.value || !(action.value.index in state) || !action.value.value || isEqualValue(state[action.value.index], action.value.value)) {
    return state;
  }
  return Object.freeze({ ...state, [action.value.index]: Object.freeze(action.value.value) });
}

export const redGameDownState = combineReducers(<ReducersMapObject<GameDownState, AnyAction>>{
  [KEY_FIV]: reduce_(DEF_FieldValues, { [actions.SET_FIV]: reduceSet }),
  [KEY_REN]: reduce_(DEF_RendererValues),
  [KEY_SCE]: combineReducers(<ReducersMapObject<GameDownStateScene, AnyAction>>
    {
      [KEY_SCE_FAC]: reduce_(DEF_SceneFactor, { [actions.SET_SCE_FAC]: reduceSet }),
      [KEY_SCE_FIE]: reduce_(DEF_GameDownStateFields,
        {
          [actions.SET_SCE_FIS]: reduceSet,
          [actions.SET_SCE_FIE]: reduceSetOverwriteIndexed,
        }),
      [KEY_SCE_FMA]: reduce_(2),
      [KEY_SCE_FMI]: reduce_(.5),
      [KEY_SCE_HOV]: reduce_(<number>null, { [actions.SET_SCE_HOV]: reduceSet }),
      [KEY_SCE_REN]: reduce_(DEF_Renderer, { [actions.SET_SCE_REN]: reduceSet }),
      [KEY_SCE_SEL]: reduce_(<number>null, { [actions.SET_SCE_SEL]: reduceSet }),
      [KEY_SCE_THE]: reduce_(<string>null, { [actions.SET_SCE_THE]: reduceSet }),
    }),
  [KEY_THE]: reduce_(Object.freeze([THEME_MISSING]), { [actions.SET_THE]: reduceSet }),
  [KEY_VID]: reduce_(false, { [actions.SET_VID]: reduceSet }),
});
