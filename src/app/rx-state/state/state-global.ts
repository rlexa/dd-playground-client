import {actor, initReduceAssemble$_, redMergeProperty_} from 'dd-rx-state';
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
}

export const mergeFlags = actor<GlobalFlags>('MERGE', SUFFIX, 'flags');

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
  },
  {
    [mergeFlags.type]: redMergeProperty_('flags'),
  },
);
