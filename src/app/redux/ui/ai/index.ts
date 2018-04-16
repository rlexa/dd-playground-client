import { combineReducers } from 'redux';
import { MlPolynomialState, redMlPolynomialState } from './ml-polynomial';

// STATE

const KEY_ML_POLYNOMIAL = 'mlPolynomial';
export interface UiAiState {
  mlPolynomial?: MlPolynomialState
}

// REDUCER

export const redUiAiState = combineReducers<UiAiState>({
  [KEY_ML_POLYNOMIAL]: redMlPolynomialState,
});
