import { InjectionToken } from '@angular/core';
import { Store, createStore, StoreEnhancer, compose } from 'redux';
import { AppState, redAppState } from './state';

export const AppStore = new InjectionToken('App.store.redux');

const devtools: StoreEnhancer<AppState> = !!window && window['__REDUX_DEVTOOLS_EXTENSION__'] ?
  window['__REDUX_DEVTOOLS_EXTENSION__']() : f => f;

export function createAppStore(): Store<AppState> {
  return createStore<AppState>(
    redAppState,
    compose(devtools)
  );
}
