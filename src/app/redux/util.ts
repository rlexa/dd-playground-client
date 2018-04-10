import { Action, Reducer } from 'redux';

export interface IActionValue<T> extends Action { value: T; }

export const createReducer = <S extends any>(initialState: S, handlers: { [key: string]: Reducer<S> }): Reducer<S> =>
  function (state = initialState, action: Action) {
    return handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state;
  };

export const redMergeValue = <T extends object>(state: T, action: IActionValue<T>) =>
  Object.freeze(Object.assign(<T>{}, state, action.value)) as T;

export const redSetValue = <T extends any>(state: T, action: IActionValue<T>) => Object.freeze(action.value) as T;
