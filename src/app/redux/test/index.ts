import { ReduxSetGlobalService } from 'app/redux/redux-set-global.service';
import { ReduxSetUiAiService } from 'app/redux/redux-set-ui-ai.service';
import { ReduxSetUiService } from 'app/redux/redux-set-ui.service';
import { ReduxService } from '../redux.service';
import { AppStore, createAppStore } from '../store';

export const provideRedux = [
  { provide: AppStore, useFactory: createAppStore },
  ReduxService,
  ReduxSetGlobalService,
  ReduxSetUiAiService,
  ReduxSetUiService,
];
