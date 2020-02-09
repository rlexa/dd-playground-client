import {AppRxStore, createAppRxStore} from './store';
import {Provider} from '@angular/core';

export const provideRxState: Provider = {provide: AppRxStore, useFactory: createAppRxStore};
