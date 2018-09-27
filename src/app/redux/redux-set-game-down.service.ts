import { Inject, Injectable } from '@angular/core';
import { actSetGameDownFieldValues, actSetGameDownStateSceneFactor, actSetGameDownStateSceneFields, actSetGameDownStateSceneHovered, actSetGameDownStateSceneTheme, actSetGameDownThemeValues, actSetGameDownViewDebug, DEF_Field, DEF_GameDownStateFields, DEF_SceneFactor, DEF_Theme, GameDownStateFields } from 'app/redux/game/down';
import { Store } from 'redux';
import { ReduxMutator } from './redux-mutator';
import { AppState } from './state';
import { AppStore } from './store';

@Injectable({ providedIn: 'root' })
export class ReduxSetGameDownService extends ReduxMutator {
  constructor(@Inject(AppStore) private readonly store: Store<AppState>, ) { super(store.dispatch); }
  private state = () => this.store.getState().game.down;

  setFieldValues = (val: string[]) => this.do(this.state().fieldValues, val || [DEF_Field], actSetGameDownFieldValues);
  setSceneFactor = (val: number) => this.do(this.state().scene.factor, typeof val !== 'number' ? DEF_SceneFactor :
    Math.max(this.state().scene.factorMin, Math.min(this.state().scene.factorMax, val)), actSetGameDownStateSceneFactor);
  setSceneFields = (val: GameDownStateFields) => this.do(this.state().scene.fields, val || DEF_GameDownStateFields, actSetGameDownStateSceneFields);
  setSceneHoveredIndex = (val: number) => this.do(this.state().scene.hoveredIndex, typeof val === 'number' ? val : <number>null, actSetGameDownStateSceneHovered);
  setSceneTheme = (val: string) => this.do(this.state().scene.theme, val || DEF_Theme, actSetGameDownStateSceneTheme);
  setThemeValues = (val: string[]) => this.do(this.state().themeValues, val || [DEF_Theme], actSetGameDownThemeValues);
  setViewDebug = (val: boolean) => this.do(this.state().viewDebug, !!val, actSetGameDownViewDebug);
}
