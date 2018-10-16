import { AppStore, createAppStore } from '../store';

export const provideRedux = [{ provide: AppStore, useFactory: createAppStore }];
