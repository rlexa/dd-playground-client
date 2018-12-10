import { ENV, Environment, train } from '@tensorflow/tfjs';

export const tfjs_OPTIMIZERS = Object.keys(train);

export const tfjs_getBackend = Environment.getBackend;
export const tfjs_setBackend = Environment.setBackend;
export const tfjs_getFeatures = ENV.getFeatures;

export * from './ml-polynomial';
export * from './util';

