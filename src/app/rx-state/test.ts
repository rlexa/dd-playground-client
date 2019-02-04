import { AppRxStore, createAppRxStore } from './store';

export const provideRxState = [{ provide: AppRxStore, useFactory: createAppRxStore }];
