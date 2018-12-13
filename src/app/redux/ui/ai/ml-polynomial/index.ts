import { action_, reduceSet, reduce_ } from 'app/redux/util';
import { AnyAction, combineReducers, ReducersMapObject } from 'redux';
import { INTERFIX } from './parent';

// STATE

const KEY_FAC = 'factorsCurrent';
const KEY_FAT = 'factorsTrained';
const KEY_LEA = 'learningRate';
const KEY_OPT = 'optimizer';
const KEY_POI = 'pointsCurrent';
export interface MlPolynomialState {
  factorsCurrent?: number[],
  factorsTrained?: number[],
  generatePointsNum?: number,
  generatePointsRangeFrom?: number,
  generatePointsRangeTo?: number,
  learningRate?: number,
  optimizer?: string,
  pointsCurrent?: number[],
}

// ACTION

const actions = {
  SET_FAC: 'SET_' + INTERFIX + '_FACTORS_CURRENT',
  SET_FAT: 'SET_' + INTERFIX + '_FACTORS_TRAINED',
  SET_LEA: 'SET_' + INTERFIX + '_LEARNING_RATE',
  SET_OPT: 'SET_' + INTERFIX + '_OPTIMIZER',
  SET_POI: 'SET_' + INTERFIX + '_POINTS_CURRENT',
}

export const actSetUiAiMlPolynomFactorsCurrent = action_<number[]>(actions.SET_FAC);
export const actSetUiAiMlPolynomFactorsTrained = action_<number[]>(actions.SET_FAT);
export const actSetUiAiMlPolynomLearningRate = action_<number>(actions.SET_LEA);
export const actSetUiAiMlPolynomOptimizer = action_<string>(actions.SET_OPT);
export const actSetUiAiMlPolynomPointsCurrent = action_<number[]>(actions.SET_POI);

// REDUCER

export const redMlPolynomialState = combineReducers(<ReducersMapObject<MlPolynomialState, AnyAction>>{
  [KEY_FAC]: reduce_(Object.freeze([1, 1, 1, 1]), { [actions.SET_FAC]: reduceSet }),
  [KEY_FAT]: reduce_(Object.freeze([0, 0, 0, 0]), { [actions.SET_FAT]: reduceSet }),
  [KEY_LEA]: reduce_(.1, { [actions.SET_LEA]: reduceSet }),
  [KEY_OPT]: reduce_(<string>null, { [actions.SET_OPT]: reduceSet }),
  [KEY_POI]: reduce_(Object.freeze([]), { [actions.SET_POI]: reduceSet }),
  generatePointsNum: reduce_(50),
  generatePointsRangeFrom: reduce_(-10),
  generatePointsRangeTo: reduce_(10),
});
