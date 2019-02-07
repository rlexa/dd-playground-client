import { Theme, THEME_MISSING } from 'app/game';
import { DEF_FieldValues, DEF_GameDownStateFields, DEF_SceneFactor, GameDownColorMap, GameDownField, GameDownScene } from 'app/module/widget/game-down/data';
import { actor, initReduceAssemble$_, jsonEqual, redSetPropertyIfNotEqual_, redSetPropertyIfNotSame_, setPropertyIfNotEqual, setPropertyIfNotSame, ValueReducer } from 'dd-rx-state';
import { SUFFIX } from './state-game-down.suffix';

export interface GameDownState {
  fieldValues?: string[],
  rendererValues?: string[],
  scene?: GameDownScene,
  themes?: Theme<GameDownColorMap>[],
  viewDebug?: boolean,
}

export interface IndexValue<T> {
  index: number,
  value: T,
}

export const set_scene_factor = actor<number>('SET' + SUFFIX + 'scene' + 'factor');
export const set_scene_field = actor<IndexValue<GameDownField>>('SET' + SUFFIX + 'scene' + 'field');
export const set_scene_fields = actor<GameDownField[]>('SET' + SUFFIX + 'scene' + 'fields');
export const set_scene_hoveredIndex = actor<number>('SET' + SUFFIX + 'scene' + 'hoveredIndex');
export const set_scene_renderer = actor<string>('SET' + SUFFIX + 'scene' + 'renderer');
export const set_scene_selectedIndex = actor<number>('SET' + SUFFIX + 'scene' + 'selectedIndex');
export const set_scene_theme = actor<string>('SET' + SUFFIX + 'scene' + 'theme');
export const set_themes = actor<Theme<GameDownColorMap>[]>('SET' + SUFFIX + 'themes');
export const set_viewDebug = actor<boolean>('SET' + SUFFIX + 'viewDebug');

// DEFAULTS

export const RENDERER_SIMPLE = 'simple';
export const DEF_Renderer = RENDERER_SIMPLE;
export const DEF_RendererValues = Object.freeze([RENDERER_SIMPLE]);

// REDUCER

const state_scene$ = initReduceAssemble$_(
  <GameDownScene>{
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
    [set_scene_factor.type]: <ValueReducer<GameDownScene>>(
      (state, val: number) => setPropertyIfNotSame(state, 'factor',
        typeof val !== 'number' ? DEF_SceneFactor : Math.max(state.factorMin, Math.min(state.factorMax, val)))),
    [set_scene_field.type]: <ValueReducer<GameDownScene>>(
      (state, val: IndexValue<GameDownField>) => !val || !val.value || !(val.index in state.fields) || jsonEqual(val.value, state.fields[val.index]) ? state :
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
