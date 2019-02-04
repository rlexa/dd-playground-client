import { InjectionToken } from '@angular/core';
import { createStore } from 'dd-rx-state';
import { state$ } from './state';

export const AppRxStore = new InjectionToken('App.store.rx');

export function createAppRxStore() {
  return createStore(state$);
}
