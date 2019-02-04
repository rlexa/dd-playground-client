import { actor, initReduceAssemble$_, redSetPropertyIfNotEqual_, redSetPropertyIfNotSame_ } from 'dd-rx-state';
import { SUFFIX } from './state-ai.suffix';

export interface MlPolynomialState {
  factorsCurrent?: number[],
  factorsTrained?: number[],
  generatePointsNum?: number,
  generatePointsRangeFrom?: number,
  generatePointsRangeTo?: number,
  learningRate?: number,
  optimizer?: string,
  pointsCurrent?: number[],
}

interface TfjsState {
  backend?: string,
  memory?: object,
}

export interface AiState {
  mlPolynomial?: MlPolynomialState,
  tfjs?: TfjsState,
}

export const set_polynomial_factorsCurrent = actor<number[]>('SET', SUFFIX, 'mlPolynomial', 'factorsCurrent');
export const set_polynomial_factorsTrained = actor<number[]>('SET', SUFFIX, 'mlPolynomial', 'factorsTrained');
export const set_polynomial_learningRate = actor<number>('SET', SUFFIX, 'mlPolynomial', 'learningRate');
export const set_polynomial_optimizer = actor<string>('SET', SUFFIX, 'mlPolynomial', 'optimizer');
export const set_polynomial_pointsCurrent = actor<number[]>('SET', SUFFIX, 'mlPolynomial', 'pointsCurrent');
export const set_tfjs_backend = actor<string>('SET', SUFFIX, 'tfjs', 'backend');
export const set_tfjs_memory = actor<object>('SET', SUFFIX, 'tfjs', 'memory');

const state_polynomial$ = initReduceAssemble$_(
  <MlPolynomialState>{
    factorsCurrent: [1, 1, 1, 1],
    factorsTrained: [0, 0, 0, 0],
    generatePointsNum: 50,
    generatePointsRangeFrom: -10,
    generatePointsRangeTo: 10,
    learningRate: .1,
    optimizer: null,
    pointsCurrent: [],
  },
  {
    [set_polynomial_factorsCurrent.type]: redSetPropertyIfNotEqual_('factorsCurrent'),
    [set_polynomial_factorsTrained.type]: redSetPropertyIfNotEqual_('factorsTrained'),
    [set_polynomial_learningRate.type]: redSetPropertyIfNotSame_('learningRate'),
    [set_polynomial_optimizer.type]: redSetPropertyIfNotSame_('optimizer'),
    [set_polynomial_pointsCurrent.type]: redSetPropertyIfNotEqual_('pointsCurrent'),
  },
);

const state_tfjs$ = initReduceAssemble$_(
  <TfjsState>{
    backend: null,
    memory: {},
  },
  {
    [set_tfjs_backend.type]: redSetPropertyIfNotSame_('backend'),
    [set_tfjs_memory.type]: redSetPropertyIfNotSame_('memory'),
  },
);

export const state_ai$ = initReduceAssemble$_(
  <AiState>{
    mlPolynomial: null,
    tfjs: null,
  },
  null,
  {
    mlPolynomial: state_polynomial$,
    tfjs: state_tfjs$,
  }
);
