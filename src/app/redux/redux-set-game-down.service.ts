import { Inject, Injectable } from '@angular/core';
import { Theme, THEME_MISSING } from 'app/game';
import { actSetGameDownFieldValues, actSetGameDownStateSceneFactor, actSetGameDownStateSceneField, actSetGameDownStateSceneFields, actSetGameDownStateSceneHoveredIndex, actSetGameDownStateSceneSelectedIndex, actSetGameDownStateSceneTheme, actSetGameDownThemes, actSetGameDownViewDebug, DEF_Field, DEF_GameDownStateFields, DEF_SceneFactor, DEF_Theme, GameDownColorMap, GameDownStateField, GameDownStateFields, IndexValue } from 'app/redux/game/down';
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
  setSceneField = (index: number, value: GameDownStateField) => this.dispatch(actSetGameDownStateSceneField(<IndexValue<GameDownStateField>>{ index, value }));
  setSceneFields = (val: GameDownStateFields) => this.do(this.state().scene.fields, val || DEF_GameDownStateFields, actSetGameDownStateSceneFields);
  setSceneHoveredIndex = (val: number) => this.do(this.state().scene.hoveredIndex, typeof val === 'number' ? val : <number>null, actSetGameDownStateSceneHoveredIndex);
  setSceneSelectedIndex = (val: number) => this.do(this.state().scene.selectedIndex, typeof val === 'number' ? val : <number>null, actSetGameDownStateSceneSelectedIndex);
  setSceneTheme = (val: string) => this.do(this.state().scene.theme, val || DEF_Theme, actSetGameDownStateSceneTheme);
  setThemes = (val: Theme<GameDownColorMap>[]) => this.do(this.state().themes, val || [THEME_MISSING], actSetGameDownThemes);
  setViewDebug = (val: boolean) => this.do(this.state().viewDebug, !!val, actSetGameDownViewDebug);
}
