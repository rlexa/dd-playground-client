import { IActionValue, createReducer, redSetValue } from 'app/redux/util';
import { combineReducers } from 'redux';

// STATE

const KEY_FACTORS_CURRENT = 'factorsCurrent';
const KEY_FACTORS_TRAINED = 'factorsTrained';
const KEY_LEARNING_RATE = 'learningRate';
const KEY_POINTS_CURRENT = 'pointsCurrent';
export interface MlPolynomialState {
  factorsCurrent?: number[];
  factorsTrained?: number[];
  learningRate?: number;
  pointsCurrent?: number[];
}

// ACTION

const mlPolynomialActions = {
  setMlPolynomialFactorsCurrent: 'ML_POLYNOMIAL_SET_FACTORS_CURRENT',
  setMlPolynomialFactorsTrained: 'ML_POLYNOMIAL_SET_FACTORS_TRAINED',
  setMlPolynomialLearningRate: 'ML_POLYNOMIAL_SET_LEARNING_RATE',
  setMlPolynomialPointsCurrent: 'ML_POLYNOMIAL_SET_POINTS_CURRENT',
}

export const actSetMlPolynomialFactorsCurrent = (value: number[]) => <IActionValue<number[]>>{ type: mlPolynomialActions.setMlPolynomialFactorsCurrent, value };
export const actSetMlPolynomialFactorsTrained = (value: number[]) => <IActionValue<number[]>>{ type: mlPolynomialActions.setMlPolynomialFactorsTrained, value };
export const actSetMlPolynomialLearningRate = (value: number) => <IActionValue<number>>{ type: mlPolynomialActions.setMlPolynomialLearningRate, value };
export const actSetMlPolynomialPointsCurrent = (value: number[]) => <IActionValue<number[]>>{ type: mlPolynomialActions.setMlPolynomialPointsCurrent, value };

// REDUCER

export const redMlPolynomialState = combineReducers<MlPolynomialState>({
  [KEY_FACTORS_CURRENT]: createReducer<number[]>(Object.freeze([1, 1, 1, 1]) as number[], { [mlPolynomialActions.setMlPolynomialFactorsCurrent]: redSetValue }),
  [KEY_FACTORS_TRAINED]: createReducer<number[]>(Object.freeze([0, 0, 0, 0]) as number[], { [mlPolynomialActions.setMlPolynomialFactorsTrained]: redSetValue }),
  [KEY_LEARNING_RATE]: createReducer<number>(.1, { [mlPolynomialActions.setMlPolynomialLearningRate]: redSetValue }),
  [KEY_POINTS_CURRENT]: createReducer<number[]>(Object.freeze([]) as number[], { [mlPolynomialActions.setMlPolynomialPointsCurrent]: redSetValue }),
});
