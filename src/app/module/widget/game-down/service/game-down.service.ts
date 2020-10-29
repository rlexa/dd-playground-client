import {Injectable, OnDestroy} from '@angular/core';
import {RxCleanup, StateSubject} from 'dd-rxjs';
import {BehaviorSubject} from 'rxjs';
import {Theme, THEME_MISSING} from 'src/app/game';
import {
  fnArg,
  fnCompose,
  fnDefault,
  fnEqual,
  fnFlip,
  fnIfThenElse,
  fnLift1,
  fnLift2,
  fnMinMax,
  fnWrapGet,
  fnWrapIn,
  fnWrapKey,
  fnWrapSet,
} from 'src/app/util/fns';
import {DEF_FAMEDOWN_STATE_FIELDS, DEF_FIELD_VALUES, DEF_SCENE_FACTOR, GameDownColorMap, GameDownField, GameDownScene} from '../data';

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

export const RENDERER_SIMPLE = 'simple';
export const DEF_RENDERER = RENDERER_SIMPLE;
export const DEF_RENDERER_VALUES = [RENDERER_SIMPLE];

const initScene = (): GameDownScene => ({
  factor: DEF_SCENE_FACTOR,
  factorMax: 2,
  factorMin: 0.5,
  fields: DEF_FAMEDOWN_STATE_FIELDS,
  renderer: DEF_RENDERER,
});
const sceneDefault = initScene();

const initState = (): GameDownState => ({
  fieldValues: DEF_FIELD_VALUES,
  rendererValues: DEF_RENDERER_VALUES,
  scene: sceneDefault,
  themes: [THEME_MISSING as Theme<GameDownColorMap>],
});
const stateDefault = initState();

const sceneFactor = fnWrapKey<GameDownScene, 'factor'>('factor');
const sceneFactorMax = fnWrapKey<GameDownScene, 'factorMax'>('factorMax');
const sceneFactorMin = fnWrapKey<GameDownScene, 'factorMin'>('factorMin');
const sceneFields = fnWrapKey<GameDownScene, 'fields'>('fields');
const sceneRenderer = fnWrapKey<GameDownScene, 'renderer'>('renderer');
const stateScene = fnWrapKey<GameDownState, 'scene'>('scene');
const stateThemes = fnWrapKey<GameDownState, 'themes'>('themes');
const stateSceneFactor = fnWrapIn(stateScene)(sceneFactor);
const stateSceneFactorMax = fnWrapIn(stateScene)(sceneFactorMax);
const stateSceneFactorMin = fnWrapIn(stateScene)(sceneFactorMin);
const stateSceneFields = fnWrapIn(stateScene)(sceneFields);
const stateSceneRenderer = fnWrapIn(stateScene)(sceneRenderer);

const getFactorMax = fnWrapGet(stateSceneFactorMax);
const getFactorMin = fnWrapGet(stateSceneFactorMin);
const getFields = fnWrapGet(stateSceneFields);

const toValidFactor = (min: number) => (max: number) => (val: number) =>
  fnMinMax(min)(max)(fnIfThenElse(typeof val === 'number')(val)(DEF_SCENE_FACTOR));
const normalizeFactor = fnFlip(fnLift2(toValidFactor)(getFactorMin)(getFactorMax));

const calculateFieldsWithField = (fields: GameDownField[]) => (val: IndexValue<GameDownField>) =>
  !val?.value || !(val.index in fields) || fnEqual(val.value)(fields[val.index])
    ? fields
    : fields.map((ii, index) => (index === val.index ? val.value : ii));
const calculateStateFieldsWithField = fnFlip(fnCompose(calculateFieldsWithField, getFields));

const setFactor = fnCompose(fnLift1(fnWrapSet(stateSceneFactor)), normalizeFactor);
const setFields = fnArg(fnDefault(DEF_FAMEDOWN_STATE_FIELDS))(fnWrapSet(stateSceneFields));
const setField = fnCompose(fnLift1(setFields), calculateStateFieldsWithField);
const setRenderer = fnArg(fnDefault(null))(fnWrapSet(stateSceneRenderer));
const setThemes = fnArg(fnDefault(stateDefault.themes))(fnWrapSet(stateThemes));

const setBehaviorSubjectValue = <T>(sbj: BehaviorSubject<T>) => <V>(fn: (arg: V) => (state: T) => T) => (arg: V) =>
  sbj.next(fn(arg)(sbj.value));

@Injectable({providedIn: 'root'})
export class GameDownService implements OnDestroy {
  @RxCleanup() private readonly game$ = new StateSubject<GameDownState>(initState());

  private readonly reduce = setBehaviorSubjectValue(this.game$);

  readonly state$ = this.game$.asObservable();

  setFactor = this.reduce(setFactor);
  setField = this.reduce(setField);
  setFields = this.reduce(setFields);
  setRenderer = this.reduce(setRenderer);
  setThemes = this.reduce(setThemes);

  destroy() {}
  ngOnDestroy() {
    this.destroy();
  }
}
