import { action_, reduceSet, reduce_ } from 'app/redux/util';
import { AnyAction, combineReducers, ReducersMapObject } from 'redux';
import { MlPolynomialState, redMlPolynomialState } from './ml-polynomial';
import { INTERFIX } from './parent';

// STATE

const KEY_TFJ_BAC = 'backend';
const KEY_TFJ_MEM = 'memory';
export interface UiAiTfjsState {
  backend?: string,
  memory?: object,
}

const KEY_MLP = 'mlPolynomial';
const KEY_TFJ = 'tfjs';
export interface UiAiState {
  mlPolynomial?: MlPolynomialState,
  tfjs?: UiAiTfjsState,
}

// ACTION

const actions = {
  SET_TFJ_BAC: 'SET_' + INTERFIX + '_' + KEY_TFJ + '_' + KEY_TFJ_BAC,
  SET_TFJ_MEM: 'SET_' + INTERFIX + '_' + KEY_TFJ + '_' + KEY_TFJ_MEM,
  SET_FAT: 'SET_' + INTERFIX + '_FACTORS_TRAINED',
  SET_LEA: 'SET_' + INTERFIX + '_LEARNING_RATE',
  SET_OPT: 'SET_' + INTERFIX + '_OPTIMIZER',
  SET_POI: 'SET_' + INTERFIX + '_POINTS_CURRENT',
}

export const actSetUiAiTfjsBackend = action_<string>(actions.SET_TFJ_BAC);
export const actSetUiAiTfjsMemory = action_<object>(actions.SET_TFJ_MEM);

// REDUCER

export const redUiAiState = combineReducers(<ReducersMapObject<UiAiState, AnyAction>>
  {
    [KEY_MLP]: redMlPolynomialState,
    [KEY_TFJ]: combineReducers(<ReducersMapObject<UiAiState, AnyAction>>
      {
        [KEY_TFJ_BAC]: reduce_(<string>null, { [actions.SET_TFJ_BAC]: reduceSet }),
        [KEY_TFJ_MEM]: reduce_({}, { [actions.SET_TFJ_MEM]: reduceSet }),
      })
  });
