import { createAction, createReducer, redSetValue } from 'app/redux/util';
import { AnyAction, ReducersMapObject, combineReducers } from 'redux';
import { INTERFIX } from './parent';

// STATE

const KEY_FAC = 'factorsCurrent';
const KEY_FAT = 'factorsTrained';
const KEY_LEA = 'learningRate';
const KEY_OPT = 'optimizer';
const KEY_POI = 'pointsCurrent';
export interface MlPolynomialState {
  factorsCurrent?: number[];
  factorsTrained?: number[];
  learningRate?: number;
  optimizer?: string;
  pointsCurrent?: number[];
}

// ACTION

const actions = {
  SET_FAC: 'SET_' + INTERFIX + '_FACTORS_CURRENT',
  SET_FAT: 'SET_' + INTERFIX + '_FACTORS_TRAINED',
  SET_LEA: 'SET_' + INTERFIX + '_LEARNING_RATE',
  SET_OPT: 'SET_' + INTERFIX + '_OPTIMIZER',
  SET_POI: 'SET_' + INTERFIX + '_POINTS_CURRENT',
}

export const actSetUiAiMlPolynomFactorsCurrent = createAction<number[]>(actions.SET_FAC);
export const actSetUiAiMlPolynomFactorsTrained = createAction<number[]>(actions.SET_FAT);
export const actSetUiAiMlPolynomLearningRate = createAction<number>(actions.SET_LEA);
export const actSetUiAiMlPolynomOptimizer = createAction<string>(actions.SET_OPT);
export const actSetUiAiMlPolynomPointsCurrent = createAction<number[]>(actions.SET_POI);

// REDUCER

export const redMlPolynomialState = combineReducers(<ReducersMapObject<MlPolynomialState, AnyAction>>{
  [KEY_FAC]: createReducer(Object.freeze([1, 1, 1, 1]), { [actions.SET_FAC]: redSetValue }),
  [KEY_FAT]: createReducer(Object.freeze([0, 0, 0, 0]), { [actions.SET_FAT]: redSetValue }),
  [KEY_LEA]: createReducer(.1, { [actions.SET_LEA]: redSetValue }),
  [KEY_OPT]: createReducer(Object.freeze(null as string), { [actions.SET_OPT]: redSetValue }),
  [KEY_POI]: createReducer(Object.freeze([]), { [actions.SET_POI]: redSetValue }),
});
