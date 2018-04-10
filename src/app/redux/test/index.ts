import { ReduxService } from '../redux.service';
import { AppStore, createAppStore } from '../store';

export const provideRedux = [{ provide: AppStore, useFactory: createAppStore }, ReduxService];
