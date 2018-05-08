import { createAction, createReducer, redMergeValue, redSetValue } from 'app/redux/util';
import { AnyAction, ReducersMapObject, combineReducers } from 'redux';
import { INTERFIX } from './parent';

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

const KEY_FLA = 'flags';
const KEY_ROU = 'route';
export interface GlobalValues {
  flags: GlobalFlags;
  route: string;
}

// ACTION

const actions = {
  MRG_FLA: 'MRG_' + INTERFIX + '_FLAGS',
  SET_ROU: 'SET_' + INTERFIX + '_ROUTE',
}

export const actMergeGlobalFlags = createAction<GlobalFlags>(actions.MRG_FLA);
export const actSetGlobalRoute = createAction<string>(actions.SET_ROU);

// REDUCER

export const redGlobalValues = combineReducers(<ReducersMapObject<GlobalValues, AnyAction>>{
  [KEY_FLA]: createReducer(Object.freeze(<GlobalFlags>
    {
      buildId: null,
      buildRevision: null,
      buildSystem: null,
      buildVariant: null,
      isProduction: false,
      project: null,
      projectParent: null,
      title: null,
      version: null
    }), {
      [actions.MRG_FLA]: redMergeValue
    }
  ),
  [KEY_ROU]: createReducer(Object.freeze(''), { [actions.SET_ROU]: redSetValue })
});
