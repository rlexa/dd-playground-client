import { InjectionToken } from '@angular/core';
import { environment } from 'environments/environment';
import { compose, createStore, Store, StoreEnhancer } from 'redux';
import { AppState, redAppState } from './state';

export const AppStore = new InjectionToken('App.store.redux');

const devtools: StoreEnhancer<AppState> = !!window && window['__REDUX_DEVTOOLS_EXTENSION__'] && !environment.production ?
  window['__REDUX_DEVTOOLS_EXTENSION__']() : f => f;

export function createAppStore(): Store<AppState> {
  return createStore(
    redAppState,
    compose(devtools)
  );
}
