import { Injectable } from '@angular/core';
import { THEME_MISSING } from 'app/game';
import { GameDownField } from 'app/module/widget/game-down/data';
import { DEF_GameDownStateFields, set_scene_factor, set_scene_field, set_scene_fields, set_scene_hoveredIndex, set_scene_renderer, set_scene_selectedIndex, set_scene_theme, set_themes, set_viewDebug } from 'app/rx-state/state/state-game-down';
import { forceBool, orNull, or_ } from 'dd-rx-state';
import { RxStateService } from './rx-state.service';

@Injectable({ providedIn: 'root' })
export class RxStateSetGameDownService {
  constructor(private readonly rxState: RxStateService) { }

  setSceneFactor = this.rxState.act_(set_scene_factor);
  setSceneFields = this.rxState.act_(set_scene_fields, or_(DEF_GameDownStateFields));
  setSceneHoveredIndex = this.rxState.act_(set_scene_hoveredIndex, val => typeof val === 'number' ? val : <number>null);
  setSceneRenderer = this.rxState.act_(set_scene_renderer, orNull);
  setSceneSelectedIndex = this.rxState.act_(set_scene_selectedIndex, val => typeof val === 'number' ? val : <number>null);
  setSceneTheme = this.rxState.act_(set_scene_theme, orNull);
  setThemes = this.rxState.act_(set_themes, or_([THEME_MISSING]));
  setViewDebug = this.rxState.act_(set_viewDebug, forceBool);

  setSceneField = (index: number, value: GameDownField) => this.rxState.act(set_scene_field, { index, value });
}
