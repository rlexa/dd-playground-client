import {
  actor,
  initReduceAssemble$_,
  redSetPropertyIfNotEqual_,
  redSetPropertyIfNotSame_,
  setPropertyIfNotEqual,
  setPropertyIfNotSame,
} from 'dd-rx-state';
import {Theme, THEME_MISSING} from 'src/app/game';
import {
  DEF_FAMEDOWN_STATE_FIELDS,
  DEF_FIELD_VALUES,
  DEF_SCENE_FACTOR,
  GameDownColorMap,
  GameDownField,
  GameDownScene,
} from 'src/app/module/widget/game-down/data';
import {isEqualValue} from 'src/app/util';
import {SUFFIX} from './state-game-down.suffix';

export interface GameDownState {
  fieldValues?: string[];
  rendererValues?: string[];
  scene?: GameDownScene;
  themes?: Theme<GameDownColorMap>[];
}

export interface IndexValue<T> {
  index: number;
  value: T;
}

export const setSceneFactor = actor<number>('SET' + SUFFIX + 'scene' + 'factor');
export const setSceneField = actor<IndexValue<GameDownField>>('SET' + SUFFIX + 'scene' + 'field');
export const setSceneFields = actor<GameDownField[]>('SET' + SUFFIX + 'scene' + 'fields');
export const setSceneRenderer = actor<string>('SET' + SUFFIX + 'scene' + 'renderer');
export const setSceneTheme = actor<string>('SET' + SUFFIX + 'scene' + 'theme');
export const setThemes = actor<Theme<GameDownColorMap>[]>('SET' + SUFFIX + 'themes');

// DEFAULTS

export const RENDERER_SIMPLE = 'simple';
export const DEF_RENDERER = RENDERER_SIMPLE;
export const DEF_RENDERER_VALUES = [RENDERER_SIMPLE];

// REDUCER

const stateScene$ = initReduceAssemble$_<GameDownScene>(
  {
    factor: DEF_SCENE_FACTOR,
    factorMax: 2,
    factorMin: 0.5,
    fields: DEF_FAMEDOWN_STATE_FIELDS,
    renderer: DEF_RENDERER,
    theme: null,
  },
  {
    [setSceneFactor.type]: (state, val: number) =>
      setPropertyIfNotSame(
        state,
        'factor',
        typeof val !== 'number' ? DEF_SCENE_FACTOR : Math.max(state.factorMin, Math.min(state.factorMax, val)),
      ),
    [setSceneField.type]: (state, val: IndexValue<GameDownField>) =>
      !val || !val.value || !(val.index in state.fields) || isEqualValue(val.value, state.fields[val.index])
        ? state
        : setPropertyIfNotEqual(
            state,
            'fields',
            state.fields.map((_, ii) => (ii === val.index ? val.value : _)),
          ),
    [setSceneFields.type]: redSetPropertyIfNotEqual_('fields'),
    [setSceneRenderer.type]: redSetPropertyIfNotSame_('renderer'),
    [setSceneTheme.type]: redSetPropertyIfNotSame_('theme'),
  },
);

export const stateGameDown$ = initReduceAssemble$_<GameDownState>(
  {
    fieldValues: DEF_FIELD_VALUES,
    rendererValues: DEF_RENDERER_VALUES,
    scene: null,
    themes: [THEME_MISSING as Theme<GameDownColorMap>],
  },
  {
    [setThemes.type]: redSetPropertyIfNotEqual_('themes'),
  },
  {
    scene: stateScene$,
  },
);
