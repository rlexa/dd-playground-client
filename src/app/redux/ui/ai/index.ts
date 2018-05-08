import { AnyAction, ReducersMapObject, combineReducers } from 'redux';
import { MlPolynomialState, redMlPolynomialState } from './ml-polynomial';

// STATE

const KEY_MLP = 'mlPolynomial';
export interface UiAiState {
  mlPolynomial?: MlPolynomialState
}

// REDUCER

export const redUiAiState = combineReducers(<ReducersMapObject<UiAiState, AnyAction>>{
  [KEY_MLP]: redMlPolynomialState,
});
