import { StringToString, Theme, THEME_MISSING } from 'app/game';
import { actor, initReduceAssemble$_, jsonEqual, redSetPropertyIfNotEqual_, redSetPropertyIfNotSame_, setPropertyIfNotEqual, setPropertyIfNotSame, ValueReducer } from 'dd-rx-state';
import { SUFFIX } from './state-game-down.suffix';

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

export interface GameDownModifier {
  type: string,
  data: any,
}

export interface GameDownStateFieldEntity {
  modifiers: GameDownModifier[],
  name: string,
  variant: number,
}

export interface GameDownStateFieldActor extends GameDownStateFieldEntity {
  isNpc: boolean,
}

export interface GameDownStateField {
  actor?: GameDownStateFieldActor,
  entities?: GameDownStateFieldEntity[],
  field?: string,
  modifiers?: GameDownModifier[],
}

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

export interface GameDownState {
  fieldValues?: string[],
  rendererValues?: string[],
  scene?: GameDownStateScene,
  themes?: Theme<GameDownColorMap>[],
  viewDebug?: boolean,
}

export interface IndexValue<T> {
  index: number,
  value: T,
}

export const set_scene_factor = actor<number>('SET' + SUFFIX + 'scene' + 'factor');
export const set_scene_field = actor<IndexValue<GameDownStateField>>('SET' + SUFFIX + 'scene' + 'field');
export const set_scene_fields = actor<GameDownStateField[]>('SET' + SUFFIX + 'scene' + 'fields');
export const set_scene_hoveredIndex = actor<number>('SET' + SUFFIX + 'scene' + 'hoveredIndex');
export const set_scene_renderer = actor<string>('SET' + SUFFIX + 'scene' + 'renderer');
export const set_scene_selectedIndex = actor<number>('SET' + SUFFIX + 'scene' + 'selectedIndex');
export const set_scene_theme = actor<string>('SET' + SUFFIX + 'scene' + 'theme');
export const set_themes = actor<Theme<GameDownColorMap>[]>('SET' + SUFFIX + 'themes');
export const set_viewDebug = actor<boolean>('SET' + SUFFIX + 'viewDebug');

// DEFAULTS

export const modifier = (type: string, data: any) => <GameDownModifier>{ type, data: [null, undefined, ''].includes(data) ? null : data };
export const modifier_ = (type: string) => (data: any = null) => modifier(type, data);

export const modBlocking = modifier_('blocking');
export const modDamageMaxIncoming = modifier_('damage-max-incoming');
export const modDestructible = modifier_('destructible');
export const modFlammable = modifier_('flammable');
export const modHealth = modifier_('health');
export const modHealthMax = modifier_('health-max');
export const modHovering = modifier_('hovering');
export const modLootable = modifier_('lootable');

export const modsHealthy = (val: number) => [modHealthMax(val), modHealth(val)];

export const GAME_DOWN_FIELD_H = 8;
export const GAME_DOWN_FIELD_W = 8;
export const GAME_DOWN_FIELD_Q = GAME_DOWN_FIELD_H * GAME_DOWN_FIELD_W;

export const DEF_SceneFactor = 1;

export const VARIANT_DEFAULT = 0;
export const VARIANT_BUILDING_SINGLE = VARIANT_DEFAULT;
export const VARIANT_BUILDING_DOUBLE = VARIANT_BUILDING_SINGLE + 1;

export const ENTITY_BUILDING = <GameDownStateFieldEntity>{ variant: VARIANT_DEFAULT, modifiers: [...modsHealthy(1), modBlocking(), modDestructible()], name: 'building' };
export const ENTITY_FOREST = <GameDownStateFieldEntity>{ variant: VARIANT_DEFAULT, modifiers: [...modsHealthy(1), modDestructible(), modFlammable()], name: 'tree' };
export const ENTITY_LOOT = <GameDownStateFieldEntity>{ variant: VARIANT_DEFAULT, modifiers: [...modsHealthy(1), modDestructible(), modLootable()], name: 'loot' };
export const ENTITY_MOUNTAIN = <GameDownStateFieldEntity>{ variant: VARIANT_DEFAULT, modifiers: [...modsHealthy(2), modBlocking(), modDamageMaxIncoming(1), modDestructible()], name: 'mountain' };

export const ACTOR_BOT_ARTILLERY = <GameDownStateFieldActor>{ variant: VARIANT_DEFAULT, modifiers: [...modsHealthy(2), modBlocking(), modDestructible()], name: 'bot_artillery', isNpc: false };
export const ACTOR_BOT_HEAVY = <GameDownStateFieldActor>{ variant: VARIANT_DEFAULT, modifiers: [...modsHealthy(4), modBlocking(), modDestructible()], name: 'bot_heavy', isNpc: false };
export const ACTOR_BOT_TANK = <GameDownStateFieldActor>{ variant: VARIANT_DEFAULT, modifiers: [...modsHealthy(3), modBlocking(), modDestructible()], name: 'bot_tank', isNpc: false };

export const ACTOR_BUG_BARFER = <GameDownStateFieldActor>{ variant: VARIANT_DEFAULT, modifiers: [...modsHealthy(3), modBlocking(), modDestructible()], name: 'bug_barfer', isNpc: true };
export const ACTOR_BUG_CRAWLER = <GameDownStateFieldActor>{ variant: VARIANT_DEFAULT, modifiers: [...modsHealthy(3), modBlocking(), modDestructible()], name: 'bug_crawler', isNpc: true };
export const ACTOR_BUG_FLIER = <GameDownStateFieldActor>{ variant: VARIANT_DEFAULT, modifiers: [...modsHealthy(2), modBlocking(), modDestructible(), modHovering()], name: 'bug_flier', isNpc: true };
export const ACTOR_BUG_SPITTER = <GameDownStateFieldActor>{ variant: VARIANT_DEFAULT, modifiers: [...modsHealthy(2), modBlocking(), modDestructible()], name: 'bug_spitter', isNpc: true };

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

export const DEF_GameDownStateFields = Array.from(Array(GAME_DOWN_FIELD_Q), () => DEF_GameDownStateField);

export const RENDERER_SIMPLE = 'simple';
export const DEF_Renderer = RENDERER_SIMPLE;
export const DEF_RendererValues = Object.freeze([RENDERER_SIMPLE]);

// REDUCER

const state_scene$ = initReduceAssemble$_(
  <GameDownStateScene>{
    factor: DEF_SceneFactor,
    factorMax: 2,
    factorMin: .5,
    fields: DEF_GameDownStateFields,
    hoveredIndex: null,
    renderer: DEF_Renderer,
    selectedIndex: null,
    theme: null,
  },
  {
    [set_scene_factor.type]: <ValueReducer<GameDownStateScene>>(
      (state, val: number) => setPropertyIfNotSame(state, 'factor',
        typeof val !== 'number' ? DEF_SceneFactor : Math.max(state.factorMin, Math.min(state.factorMax, val)))),
    [set_scene_field.type]: <ValueReducer<GameDownStateScene>>(
      (state, val: IndexValue<GameDownStateField>) => !val || !val.value || !(val.index in state.fields) || jsonEqual(val.value, state.fields[val.index]) ? state :
        setPropertyIfNotEqual(state, 'fields', state.fields.map((_, ii) => ii === val.index ? val.value : _))),
    [set_scene_fields.type]: redSetPropertyIfNotEqual_('fields'),
    [set_scene_hoveredIndex.type]: redSetPropertyIfNotSame_('hoveredIndex'),
    [set_scene_renderer.type]: redSetPropertyIfNotSame_('renderer'),
    [set_scene_selectedIndex.type]: redSetPropertyIfNotSame_('selectedIndex'),
    [set_scene_theme.type]: redSetPropertyIfNotSame_('theme'),
  },
);

export const state_game_down$ = initReduceAssemble$_(
  <GameDownState>{
    fieldValues: DEF_FieldValues,
    rendererValues: DEF_RendererValues,
    scene: null,
    themes: [THEME_MISSING],
    viewDebug: false,
  },
  {
    [set_themes.type]: redSetPropertyIfNotEqual_('themes'),
    [set_viewDebug.type]: redSetPropertyIfNotSame_('viewDebug'),
  },
  {
    scene: state_scene$,
  }
);
