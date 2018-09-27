import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ReduxService, ReduxSetGameDownService } from 'app/redux';
import { DEF_GameDownStateFields, FieldValueWater, GameDownStateFields, GAME_DOWN_FIELD_W } from 'app/redux/game/down';
import { DoneSubject, rxComplete } from 'app/rx';
import { trackByIndex } from 'app/widgets/util';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

const WW = GAME_DOWN_FIELD_W;
const FieldsPreset_Situation1 = <GameDownStateFields>
  {
    ...DEF_GameDownStateFields,
    [0 * WW + 0]: { field: FieldValueWater }, [0 * WW + 1]: { field: FieldValueWater },
    [1 * WW + 0]: { field: FieldValueWater },
    [2 * WW + 0]: { field: FieldValueWater },
    [3 * WW + 0]: { field: FieldValueWater },
    [4 * WW + 0]: { field: FieldValueWater },
    [5 * WW + 0]: { field: FieldValueWater },
    [6 * WW + 0]: { field: FieldValueWater }, [6 * WW + 1]: { field: FieldValueWater },
    [7 * WW + 0]: { field: FieldValueWater }, [7 * WW + 1]: { field: FieldValueWater },
  };

@Component({
  selector: 'app-game-down-config',
  templateUrl: './game-down-config.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDownConfigComponent implements OnDestroy {
  constructor(
    private readonly redux: ReduxService,
    private readonly reduxSet: ReduxSetGameDownService,
  ) { }

  private readonly done$ = new DoneSubject();

  readonly theme$ = this.redux.watch(state => state.game.down.scene.theme, this.done$);
  readonly themes$ = this.redux.watch(state => state.game.down.themeValues, this.done$);
  readonly viewDebug$ = this.redux.watch(state => state.game.down.viewDebug, this.done$);

  readonly sceneFieldsPresets$ = new BehaviorSubject<{ [key: string]: GameDownStateFields }>(
    {
      'Default': DEF_GameDownStateFields,
      'Situation 1': FieldsPreset_Situation1,
    });
  readonly sceneFieldsPresetsKeys$ = this.sceneFieldsPresets$.pipe(map(Object.keys));

  onSetTheme = this.reduxSet.setSceneTheme;
  onSetViewDebug = this.reduxSet.setViewDebug;

  trackByIndex = trackByIndex;

  ngOnDestroy() {
    this.done$.done();
    rxComplete(
      this.sceneFieldsPresets$,
    );
  }

  onSetFieldsPresetKey = (key: string) => key in this.sceneFieldsPresets$.value ? this.reduxSet.setSceneFields(this.sceneFieldsPresets$.value[key]) : {};
}
