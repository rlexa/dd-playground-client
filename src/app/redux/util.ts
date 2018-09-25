import { Action, Reducer } from 'redux';

export interface ActionValue<T> extends Action { value: T; }

export const action_ = <T>(action: string) => (value: T) => <ActionValue<T>>{ type: action, value };

export const reduce_ = <S>(initialState: S, handlers?: { [key: string]: Reducer<S> }): Reducer<S> =>
  (state = initialState, action: Action) => handlers && handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state;

export const reduceMrg = <T extends object>(state: T, action: ActionValue<T>) => Object.freeze(Object.assign(<T>{}, state, action.value)) as T;
export const reduceSet = <T>(state: T, action: ActionValue<T>) => Object.freeze(action.value) as T;
