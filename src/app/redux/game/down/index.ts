import { StringToString, Theme, THEME_MISSING } from 'app/game';
import { ActionValue, action_, reduceSet, reduce_ } from 'app/redux/util';
import { isEqualValue } from 'app/util';
import { AnyAction, combineReducers, ReducersMapObject } from 'redux';
import { INTERFIX } from './parent';

// THEME

export interface GameDownColorMap extends StringToString {
  actorNpc: string,
  actorPc: string,
  entityBuilding: string,
  entityForest: string,
  entityLoot: string,
  entityMountain: string,
  fieldBackground: string,
  fieldGround: string,
  fieldWater: string,
}

// STATE

export interface GameDownStateFieldEntity {
  health: number,
  modifiers: string[],
  name: string,
  variant: number,
}

export interface GameDownStateFieldActor extends GameDownStateFieldEntity {
  healthMax: number,
  isNpc: boolean,
}

export interface GameDownStateField {
  actor?: GameDownStateFieldActor,
  entities?: GameDownStateFieldEntity[],
  field?: string,
  modifiers?: string[],
}

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
  fields: GameDownStateField[],
  hoveredIndex: number,
  renderer: string,
  selectedIndex: number,
  theme: string,
}

const KEY_FIV = 'fieldValues';
const KEY_MOD = 'modifierValues';
const KEY_REN = 'rendererValues';
const KEY_SCE = 'scene';
const KEY_THE = 'themes';
const KEY_VID = 'viewDebug';
export interface GameDownState {
  fieldValues: string[],
  modifierValues: string[],
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

export const MODIFIER_BLOCKS = 'blocking';
export const MODIFIER_DESTRUCTIBLE = 'destructible';
export const MODIFIER_FLAMMABLE = 'flammable';
export const MODIFIER_HOVERING = 'hovering';
export const MODIFIER_LOOTABLE = 'lootable';
export const DEF_ModifierValues = [MODIFIER_BLOCKS, MODIFIER_DESTRUCTIBLE, MODIFIER_FLAMMABLE, MODIFIER_HOVERING, MODIFIER_LOOTABLE];

export const VARIANT_DEFAULT = 0;
export const VARIANT_BUILDING_SINGLE = VARIANT_DEFAULT;
export const VARIANT_BUILDING_DOUBLE = VARIANT_BUILDING_SINGLE + 1;

const ENTITY_BASE = <GameDownStateFieldEntity>{ health: 1, variant: VARIANT_DEFAULT };
export const ENTITY_BUILDING = Object.freeze(<GameDownStateFieldEntity>{ ...ENTITY_BASE, modifiers: [MODIFIER_BLOCKS, MODIFIER_DESTRUCTIBLE], name: 'building' });
export const ENTITY_FOREST = Object.freeze(<GameDownStateFieldEntity>{ ...ENTITY_BASE, modifiers: [MODIFIER_DESTRUCTIBLE, MODIFIER_FLAMMABLE], name: 'tree' });
export const ENTITY_LOOT = Object.freeze(<GameDownStateFieldEntity>{ ...ENTITY_BASE, modifiers: [MODIFIER_DESTRUCTIBLE, MODIFIER_LOOTABLE], name: 'loot' });
export const ENTITY_MOUNTAIN = Object.freeze(<GameDownStateFieldEntity>{ ...ENTITY_BASE, health: 2, modifiers: [MODIFIER_BLOCKS, MODIFIER_DESTRUCTIBLE], name: 'mountain' });

export const ACTOR_BOT_ARTILLERY = Object.freeze(<GameDownStateFieldActor>{ ...ENTITY_BASE, health: 2, modifiers: [MODIFIER_BLOCKS, MODIFIER_DESTRUCTIBLE], name: 'bot_artillery', healthMax: 2, isNpc: false });
export const ACTOR_BOT_HEAVY = Object.freeze(<GameDownStateFieldActor>{ ...ENTITY_BASE, health: 4, modifiers: [MODIFIER_BLOCKS, MODIFIER_DESTRUCTIBLE], name: 'bot_heavy', healthMax: 4, isNpc: false });
export const ACTOR_BOT_TANK = Object.freeze(<GameDownStateFieldActor>{ ...ENTITY_BASE, health: 3, modifiers: [MODIFIER_BLOCKS, MODIFIER_DESTRUCTIBLE], name: 'bot_tank', healthMax: 3, isNpc: false });

export const ACTOR_BUG_BARFER = Object.freeze(<GameDownStateFieldActor>{ ...ENTITY_BASE, health: 3, modifiers: [MODIFIER_BLOCKS, MODIFIER_DESTRUCTIBLE], name: 'bug_barfer', healthMax: 3, isNpc: true });
export const ACTOR_BUG_CRAWLER = Object.freeze(<GameDownStateFieldActor>{ ...ENTITY_BASE, health: 3, modifiers: [MODIFIER_BLOCKS, MODIFIER_DESTRUCTIBLE], name: 'bug_crawler', healthMax: 3, isNpc: true });
export const ACTOR_BUG_FLIER = Object.freeze(<GameDownStateFieldActor>{ ...ENTITY_BASE, health: 2, modifiers: [MODIFIER_BLOCKS, MODIFIER_DESTRUCTIBLE, MODIFIER_HOVERING], name: 'bug_flier', healthMax: 2, isNpc: true });
export const ACTOR_BUG_SPITTER = Object.freeze(<GameDownStateFieldActor>{ ...ENTITY_BASE, health: 2, modifiers: [MODIFIER_BLOCKS, MODIFIER_DESTRUCTIBLE], name: 'bug_spitter', healthMax: 2, isNpc: true });

export const FIELD_GROUND = 'ground';
export const FIELD_WATER = 'water';
export const DEF_FieldValues = [FIELD_GROUND, FIELD_WATER];
export const DEF_Field = FIELD_GROUND;

export const DEF_GameDownStateField = Object.freeze(
  <GameDownStateField>{
    entities: [],
    field: DEF_Field,
    modifiers: [],
  });

export const DEF_GameDownStateFields = Object.freeze(Array.from(Array(GAME_DOWN_FIELD_Q), () => DEF_GameDownStateField));

export const RENDERER_SIMPLE = 'simple';
export const DEF_Renderer = RENDERER_SIMPLE;
export const DEF_RendererValues = Object.freeze([RENDERER_SIMPLE]);

// ACTION

const actions = {
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

export const actSetGameDownStateSceneFactor = action_<number>(actions.SET_SCE_FAC);
export const actSetGameDownStateSceneField = action_<IndexValue<GameDownStateField>>(actions.SET_SCE_FIE);
export const actSetGameDownStateSceneFields = action_<GameDownStateField[]>(actions.SET_SCE_FIS);
export const actSetGameDownStateSceneHoveredIndex = action_<number>(actions.SET_SCE_HOV);
export const actSetGameDownStateSceneRenderer = action_<string>(actions.SET_SCE_REN);
export const actSetGameDownStateSceneSelectedIndex = action_<number>(actions.SET_SCE_SEL);
export const actSetGameDownStateSceneTheme = action_<string>(actions.SET_SCE_THE);
export const actSetGameDownThemes = action_<Theme<GameDownColorMap>[]>(actions.SET_THE);
export const actSetGameDownViewDebug = action_<boolean>(actions.SET_VID);

// REDUCER

const reduceSetOverwriteIndexed = <T>(state: T[], action: ActionValue<IndexValue<T>>) => {
  if (!action.value || !(action.value.index in state) || !action.value.value || isEqualValue(state[action.value.index], action.value.value)) {
    return state;
  }
  const ret = [...state];
  ret[action.value.index] = Object.freeze(action.value.value);
  return ret;
}

export const redGameDownState = combineReducers(<ReducersMapObject<GameDownState, AnyAction>>{
  [KEY_FIV]: reduce_(DEF_FieldValues),
  [KEY_MOD]: reduce_(DEF_ModifierValues),
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
