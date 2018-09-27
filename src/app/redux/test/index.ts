import { ReduxSetGameDownService } from '../redux-set-game-down.service';
import { ReduxSetGlobalService } from '../redux-set-global.service';
import { ReduxSetUiAiService } from '../redux-set-ui-ai.service';
import { ReduxSetUiService } from '../redux-set-ui.service';
import { ReduxService } from '../redux.service';
import { AppStore, createAppStore } from '../store';

export const provideRedux = [
  { provide: AppStore, useFactory: createAppStore },
  ReduxService,
  ReduxSetGameDownService,
  ReduxSetGlobalService,
  ReduxSetUiAiService,
  ReduxSetUiService,
];
