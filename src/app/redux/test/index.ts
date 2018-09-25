import { ReduxSetService } from 'app/redux/redux-set.service';
import { ReduxService } from '../redux.service';
import { AppStore, createAppStore } from '../store';

export const provideRedux = [{ provide: AppStore, useFactory: createAppStore }, ReduxService, ReduxSetService];
