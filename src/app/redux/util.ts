import { Action, Reducer } from 'redux';

export interface IActionValue<T> extends Action { value: T; }

export const createAction = <T extends any>(action: string) => (value: T) => <IActionValue<T>>{ type: action, value };

export const createReducer = <S extends any>(initialState: S, handlers?: { [key: string]: Reducer<S> }): Reducer<S> =>
  function (state = initialState, action: Action) {
    return handlers && handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state;
  };

export const redMergeValue = <T extends object>(state: T, action: IActionValue<T>) => <T>Object.assign({}, state, action.value);

export const redSetValue = <T extends any>(state: T, action: IActionValue<T>) => action.value;
