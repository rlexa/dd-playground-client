import { Action, ActionCreator, Reducer, combineReducers } from 'redux';
import { IActionValue, createReducer, redSetValue, redMergeValue } from '../util';

// STATE

/** Flags loaded from JSON resource. */
export interface GlobalFlags {
  buildId?: string;
  buildRevision?: string;
  buildSystem?: string;
  buildVariant?: string;
  isProduction?: boolean;
  project?: string;
  projectParent?: string;
  title?: string;
  version?: string;
}

const KEY_FLAGS = 'flags';
const KEY_ROUTE = 'route';
export interface GlobalValues {
  flags: GlobalFlags;
  route: string;
}

// ACTION

const globalActions = {
  mergeFlags: 'MERGE_GLOBAL_FLAGS',
  setRoute: 'SET_GLOBAL_ROUTE'
}

export const actMergeGlobalFlags = (value: GlobalFlags) => <IActionValue<GlobalFlags>>{ type: globalActions.mergeFlags, value };
export const actSetGlobalRoute = (value: string) => <IActionValue<string>>{ type: globalActions.setRoute, value };

// REDUCER

export const redGlobalValues = combineReducers<GlobalValues>({
  [KEY_FLAGS]: createReducer(Object.freeze(<GlobalFlags>
    {
      buildId: null,
      buildRevision: null,
      buildSystem: null,
      buildVariant: null,
      isProduction: false,
      project: null,
      projectParent: null,
      title: null,
      urlJiraTasks: null,
      version: null
    }), {
      [globalActions.mergeFlags]: redMergeValue
    }
  ),
  [KEY_ROUTE]: createReducer<string>(Object.freeze('') as string, { [globalActions.setRoute]: redSetValue })
});
