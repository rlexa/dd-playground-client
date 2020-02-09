import {actor, initReduceAssemble$_, redMergeProperty_, redSetPropertyIfNotSame_} from 'dd-rx-state';
import {SUFFIX} from './state-global.suffix';

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

export interface GlobalValues {
  flags: GlobalFlags;
  route: string;
}

export const mergeFlags = actor<GlobalFlags>('MERGE', SUFFIX, 'flags');
export const setRoute = actor<string>('SET', SUFFIX, 'route');

export const stateGlobal$ = initReduceAssemble$_<GlobalValues>(
  {
    flags: {
      buildId: null,
      buildRevision: null,
      buildSystem: null,
      buildVariant: null,
      isProduction: false,
      project: null,
      projectParent: null,
      title: null,
      version: null,
    },
    route: '',
  },
  {
    [mergeFlags.type]: redMergeProperty_('flags'),
    [setRoute.type]: redSetPropertyIfNotSame_('route'),
  },
);
