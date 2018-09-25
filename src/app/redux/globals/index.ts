import { action_, reduceMrg, reduceSet, reduce_ } from 'app/redux/util';
import { AnyAction, combineReducers, ReducersMapObject } from 'redux';
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

export const actMergeGlobalFlags = action_<GlobalFlags>(actions.MRG_FLA);
export const actSetGlobalRoute = action_<string>(actions.SET_ROU);

// REDUCER

export const redGlobalValues = combineReducers(<ReducersMapObject<GlobalValues, AnyAction>>{
  [KEY_FLA]: reduce_(Object.freeze(<GlobalFlags>
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
      [actions.MRG_FLA]: reduceMrg
    }
  ),
  [KEY_ROU]: reduce_(Object.freeze(''), { [actions.SET_ROU]: reduceSet })
});
