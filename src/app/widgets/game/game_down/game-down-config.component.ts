import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ReduxService, ReduxSetGameDownService } from 'app/redux';
import { DEF_GameDownStateField, DEF_GameDownStateFields, ENTITY_BUILDING, ENTITY_FOREST, ENTITY_LOOT, ENTITY_MOUNTAIN, FIELD_WATER, GameDownStateField, GAME_DOWN_FIELD_W, VARIANT_BUILDING_DOUBLE } from 'app/redux/game/down';
import { DoneSubject, rxComplete } from 'app/rx';
import { trackByIndex } from 'app/widgets/util';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

const WW = GAME_DOWN_FIELD_W;

const build_Situation_1 = () => {
  const fields = [...DEF_GameDownStateFields];

  fields[0 * WW + 0] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[0 * WW + 1] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[0 * WW + 2] = { ...DEF_GameDownStateField, entities: [ENTITY_FOREST] };
  fields[0 * WW + 5] = { ...DEF_GameDownStateField, entities: [ENTITY_BUILDING] };
  fields[0 * WW + 6] = { ...DEF_GameDownStateField, entities: [ENTITY_MOUNTAIN] };
  fields[0 * WW + 7] = { ...DEF_GameDownStateField, entities: [ENTITY_MOUNTAIN] };

  fields[1 * WW + 0] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[1 * WW + 1] = { ...DEF_GameDownStateField, entities: [ENTITY_BUILDING] };
  fields[1 * WW + 2] = { ...DEF_GameDownStateField, entities: [ENTITY_FOREST] };
  fields[1 * WW + 5] = { ...DEF_GameDownStateField, entities: [ENTITY_BUILDING] };
  fields[1 * WW + 6] = { ...DEF_GameDownStateField, entities: [ENTITY_BUILDING] };
  fields[1 * WW + 7] = { ...DEF_GameDownStateField, entities: [ENTITY_MOUNTAIN] };

  fields[2 * WW + 0] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[1 * WW + 1] = { ...DEF_GameDownStateField, entities: [ENTITY_BUILDING] };
  fields[2 * WW + 4] = { ...DEF_GameDownStateField, entities: [ENTITY_FOREST] };

  fields[3 * WW + 0] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[3 * WW + 2] = { ...DEF_GameDownStateField, entities: [ENTITY_FOREST] };

  fields[4 * WW + 0] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[4 * WW + 1] = { ...DEF_GameDownStateField, entities: [{ ...ENTITY_BUILDING, variant: VARIANT_BUILDING_DOUBLE }] };
  fields[4 * WW + 6] = { ...DEF_GameDownStateField, entities: [ENTITY_FOREST] };

  fields[5 * WW + 0] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[5 * WW + 1] = { ...DEF_GameDownStateField, entities: [{ ...ENTITY_BUILDING, variant: VARIANT_BUILDING_DOUBLE }] };
  fields[5 * WW + 5] = { ...DEF_GameDownStateField, entities: [{ ...ENTITY_BUILDING, variant: VARIANT_BUILDING_DOUBLE }] };

  fields[6 * WW + 0] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[6 * WW + 1] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[6 * WW + 2] = { ...DEF_GameDownStateField, entities: [ENTITY_LOOT] };
  fields[6 * WW + 6] = { ...DEF_GameDownStateField, entities: [ENTITY_FOREST] };

  fields[7 * WW + 0] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[7 * WW + 1] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[7 * WW + 7] = { ...DEF_GameDownStateField, entities: [ENTITY_MOUNTAIN] };

  return fields;
}

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

  readonly factor$ = this.redux.watch(state => state.game.down.scene.factor, this.done$);
  readonly factorMax$ = this.redux.watch(state => state.game.down.scene.factorMax, this.done$);
  readonly factorMin$ = this.redux.watch(state => state.game.down.scene.factorMin, this.done$);
  readonly fields$ = this.redux.watch(state => state.game.down.fieldValues, this.done$);
  readonly renderer$ = this.redux.watch(state => state.game.down.scene.renderer, this.done$);
  readonly renderers$ = this.redux.watch(state => state.game.down.rendererValues, this.done$);
  readonly selectedFieldIndex$ = this.redux.watch(state => state.game.down.scene.selectedIndex, this.done$);
  readonly theme$ = this.redux.watch(state => state.game.down.scene.theme, this.done$);
  readonly themes$ = this.redux.watch(state => state.game.down.themes, this.done$).pipe(map(_ => _.map(ii => ii.name)));
  readonly viewDebug$ = this.redux.watch(state => state.game.down.viewDebug, this.done$);

  readonly selectedField$ = combineLatest(this.selectedFieldIndex$, this.redux.watch(state => state.game.down.scene.fields, this.done$))
    .pipe(map(([index, fields]) => fields[index] || null), takeUntil(this.done$));
  readonly selectedFieldEntities$ = this.selectedField$.pipe(map(_ => _.entities));

  readonly sceneFieldsPresets$ = new BehaviorSubject<{ [key: string]: GameDownStateField[] }>(
    {
      'Default': [...DEF_GameDownStateFields],
      'Situation 1': build_Situation_1(),
    });
  readonly sceneFieldsPresetsKeys$ = this.sceneFieldsPresets$.pipe(map(Object.keys));

  onSetFactor = this.reduxSet.setSceneFactor;
  onSetRenderer = this.reduxSet.setSceneRenderer;
  onSetTheme = this.reduxSet.setSceneTheme;
  onSetViewDebug = this.reduxSet.setViewDebug;

  trackByIndex = trackByIndex;

  ngOnDestroy() {
    this.done$.done();
    rxComplete(
      this.sceneFieldsPresets$,
    );
  }

  onMergeSelectedField_Field = (into: GameDownStateField, field: string) => this.onMergeSelectedField(into, { field });

  onSetFieldsPresetKey = (key: string) => key in this.sceneFieldsPresets$.value ? this.reduxSet.setSceneFields(this.sceneFieldsPresets$.value[key]) : {};

  private onMergeSelectedField = (into: GameDownStateField, merge: GameDownStateField) => of({ into, merge, index: this.selectedFieldIndex$.value })
    .pipe(filter(_ => Object.keys(merge).length > 0 && Object.keys(merge).every(key => key in into)))
    .subscribe(_ => this.reduxSet.setSceneField(_.index, { ..._.into, ..._.merge }));
}
