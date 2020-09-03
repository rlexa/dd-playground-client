import {Injectable} from '@angular/core';
import {THEME_MISSING} from 'src/app/game';
import {DEF_FAMEDOWN_STATE_FIELDS, GameDownField} from 'src/app/module/widget/game-down/data';
import {
  setSceneFactor,
  setSceneField,
  setSceneFields,
  setSceneRenderer,
  setSceneTheme,
  setThemes,
  setViewDebug,
} from 'src/app/rx-state/state/state-game-down';
import {forceBool, orNull, or_} from 'dd-rx-state';
import {RxStateService} from './rx-state.service';

@Injectable({providedIn: 'root'})
export class RxStateSetGameDownService {
  constructor(private readonly rxState: RxStateService) {}

  setSceneFactor = this.rxState.act_(setSceneFactor);
  setSceneFields = this.rxState.act_(setSceneFields, or_(DEF_FAMEDOWN_STATE_FIELDS));
  setSceneRenderer = this.rxState.act_(setSceneRenderer, orNull);
  setSceneTheme = this.rxState.act_(setSceneTheme, orNull);
  setThemes = this.rxState.act_(setThemes, or_([THEME_MISSING]));
  setViewDebug = this.rxState.act_(setViewDebug, forceBool);

  setSceneField = (index: number, value: GameDownField) => this.rxState.act(setSceneField, {index, value});
}
