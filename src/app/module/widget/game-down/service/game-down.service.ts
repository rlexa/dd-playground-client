import {Injectable, OnDestroy} from '@angular/core';
import {RxCleanup, StateSubject} from 'dd-rxjs';
import {BehaviorSubject} from 'rxjs';
import {Theme, THEME_MISSING} from 'src/app/game';
import {
  fnCompose,
  fnDefault,
  fnEqual,
  fnFlip,
  fnIfThenElse,
  fnLift2,
  fnMinMax,
  fnProcessApply,
  fnProcessApplyScoped,
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
const DEF_RENDERER = RENDERER_SIMPLE;
const DEF_RENDERER_VALUES = [RENDERER_SIMPLE];

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

const getSceneFactorMax = fnWrapGet(stateSceneFactorMax);
const getSceneFactorMin = fnWrapGet(stateSceneFactorMin);
const getSceneFields = fnWrapGet(stateSceneFields);

const setSceneFactor = fnWrapSet(stateSceneFactor);
const setSceneFields = fnWrapSet(stateSceneFields);
const setSceneRenderer = fnWrapSet(stateSceneRenderer);
const setThemes = fnWrapSet(stateThemes);

const toValidFactor = (min: number) => (max: number) => (val: number) =>
  fnMinMax(min)(max)(fnIfThenElse(typeof val === 'number')(val)(DEF_SCENE_FACTOR));
const normalizeFactor = fnFlip(fnLift2(toValidFactor)(getSceneFactorMin)(getSceneFactorMax));

const calculateFieldsWithField = (fields: GameDownField[]) => (val: IndexValue<GameDownField>) =>
  !val?.value || !(val.index in fields) || fnEqual(val.value)(fields[val.index])
    ? fields
    : fields.map((ii, index) => (index === val.index ? val.value : ii));
const calculateStateFieldsWithField = fnFlip(fnCompose(calculateFieldsWithField, getSceneFields));

const redFactor = fnProcessApplyScoped(setSceneFactor)(normalizeFactor);
const redFields = fnProcessApply(setSceneFields)(fnDefault(DEF_FAMEDOWN_STATE_FIELDS));
const redField = fnProcessApplyScoped(redFields)(calculateStateFieldsWithField);
const redRenderer = fnProcessApply(setSceneRenderer)(fnDefault(null));
const redThemes = fnProcessApply(setThemes)(fnDefault(stateDefault.themes));

const setBehaviorSubjectValue = <T>(sbj: BehaviorSubject<T>) => <V>(fn: (arg: V) => (state: T) => T) => (arg: V) =>
  sbj.next(fn(arg)(sbj.value));

@Injectable({providedIn: 'root'})
export class GameDownService implements OnDestroy {
  @RxCleanup() private readonly game$ = new StateSubject<GameDownState>(initState());

  private readonly reduce = setBehaviorSubjectValue(this.game$);

  readonly state$ = this.game$.asObservable();

  setFactor = this.reduce(redFactor);
  setField = this.reduce(redField);
  setFields = this.reduce(redFields);
  setRenderer = this.reduce(redRenderer);
  setThemes = this.reduce(redThemes);

  destroy() {}
  ngOnDestroy() {
    this.destroy();
  }
}
