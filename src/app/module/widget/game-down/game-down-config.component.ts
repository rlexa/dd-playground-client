import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { RxStateService, RxStateSetGameDownService } from 'app/rx-state';
import { ACTOR_BOT_ARTILLERY, ACTOR_BOT_HEAVY, ACTOR_BOT_TANK, ACTOR_BUG_BARFER, ACTOR_BUG_CRAWLER, ACTOR_BUG_FLIER, ACTOR_BUG_SPITTER, DEF_GameDownStateField, DEF_GameDownStateFields, ENTITY_BUILDING, ENTITY_FOREST, ENTITY_LOOT, ENTITY_MOUNTAIN, FIELD_WATER, GameDownStateField, GAME_DOWN_FIELD_W, VARIANT_BUILDING_DOUBLE } from 'app/rx-state/state/state-game-down';
import { trackByIndex } from 'app/util';
import { DoneSubject, RxCleanup } from 'dd-rxjs';
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
  fields[1 * WW + 4] = { ...DEF_GameDownStateField, actor: ACTOR_BOT_ARTILLERY };
  fields[1 * WW + 5] = { ...DEF_GameDownStateField, entities: [ENTITY_BUILDING] };
  fields[1 * WW + 6] = { ...DEF_GameDownStateField, entities: [ENTITY_BUILDING] };
  fields[1 * WW + 7] = { ...DEF_GameDownStateField, entities: [ENTITY_MOUNTAIN] };

  fields[2 * WW + 0] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[2 * WW + 1] = { ...DEF_GameDownStateField, entities: [ENTITY_BUILDING] };
  fields[2 * WW + 4] = { ...DEF_GameDownStateField, entities: [ENTITY_FOREST], actor: ACTOR_BOT_HEAVY };

  fields[3 * WW + 0] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[3 * WW + 2] = { ...DEF_GameDownStateField, entities: [ENTITY_FOREST] };
  fields[3 * WW + 3] = { ...DEF_GameDownStateField, actor: ACTOR_BOT_TANK };
  fields[3 * WW + 5] = { ...DEF_GameDownStateField, actor: ACTOR_BUG_BARFER };

  fields[4 * WW + 0] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[4 * WW + 1] = { ...DEF_GameDownStateField, entities: [{ ...ENTITY_BUILDING, variant: VARIANT_BUILDING_DOUBLE }] };
  fields[4 * WW + 6] = { ...DEF_GameDownStateField, entities: [ENTITY_FOREST] };

  fields[5 * WW + 0] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[5 * WW + 1] = { ...DEF_GameDownStateField, entities: [{ ...ENTITY_BUILDING, variant: VARIANT_BUILDING_DOUBLE }] };
  fields[5 * WW + 5] = { ...DEF_GameDownStateField, entities: [{ ...ENTITY_BUILDING, variant: VARIANT_BUILDING_DOUBLE }] };
  fields[5 * WW + 6] = { ...DEF_GameDownStateField, actor: ACTOR_BUG_FLIER };

  fields[6 * WW + 0] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[6 * WW + 1] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[6 * WW + 2] = { ...DEF_GameDownStateField, entities: [ENTITY_LOOT] };
  fields[6 * WW + 3] = { ...DEF_GameDownStateField, actor: ACTOR_BUG_SPITTER };
  fields[6 * WW + 4] = { ...DEF_GameDownStateField, actor: ACTOR_BUG_CRAWLER };
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
    private readonly rxState: RxStateService,
    private readonly rxStateMutate: RxStateSetGameDownService,
  ) { }

  @RxCleanup() private readonly done$ = new DoneSubject();

  readonly factor$ = this.rxState.watch(state => state.game.down.scene.factor, this.done$);
  readonly factorMax$ = this.rxState.watch(state => state.game.down.scene.factorMax, this.done$);
  readonly factorMin$ = this.rxState.watch(state => state.game.down.scene.factorMin, this.done$);
  readonly fields$ = this.rxState.watch(state => state.game.down.fieldValues, this.done$);
  readonly renderer$ = this.rxState.watch(state => state.game.down.scene.renderer, this.done$);
  readonly renderers$ = this.rxState.watch(state => state.game.down.rendererValues, this.done$);
  readonly selectedFieldIndex$ = this.rxState.watch(state => state.game.down.scene.selectedIndex, this.done$);
  readonly theme$ = this.rxState.watch(state => state.game.down.scene.theme, this.done$);
  readonly themes$ = this.rxState.watch(state => state.game.down.themes, this.done$).pipe(map(_ => _.map(ii => ii.name)));
  readonly viewDebug$ = this.rxState.watch(state => state.game.down.viewDebug, this.done$);

  readonly selectedField$ = combineLatest(this.selectedFieldIndex$, this.rxState.watch(state => state.game.down.scene.fields, this.done$))
    .pipe(map(([index, fields]) => fields[index] || null), takeUntil(this.done$));
  readonly selectedFieldActor$ = this.selectedField$.pipe(map(_ => _.actor));
  readonly selectedFieldEntities$ = this.selectedField$.pipe(map(_ => _.entities));

  @RxCleanup() readonly sceneFieldsPresets$ = new BehaviorSubject<{ [key: string]: GameDownStateField[] }>(
    {
      'Default': [...DEF_GameDownStateFields],
      'Situation 1': build_Situation_1(),
    });
  readonly sceneFieldsPresetsKeys$ = this.sceneFieldsPresets$.pipe(map(Object.keys));

  onSetFactor = this.rxStateMutate.setSceneFactor;
  onSetRenderer = this.rxStateMutate.setSceneRenderer;
  onSetTheme = this.rxStateMutate.setSceneTheme;
  onSetViewDebug = this.rxStateMutate.setViewDebug;

  trackByIndex = trackByIndex;

  ngOnDestroy() { }

  onMergeSelectedField_Field = (into: GameDownStateField, field: string) => this.onMergeSelectedField(into, { field });

  onSetFieldsPresetKey = (key: string) => key in this.sceneFieldsPresets$.value ? this.rxStateMutate.setSceneFields(this.sceneFieldsPresets$.value[key]) : {};

  private onMergeSelectedField = (into: GameDownStateField, merge: GameDownStateField) => of({ into, merge, index: this.selectedFieldIndex$.value })
    .pipe(filter(_ => Object.keys(merge).length > 0 && Object.keys(merge).every(key => key in into)))
    .subscribe(_ => this.rxStateMutate.setSceneField(_.index, { ..._.into, ..._.merge }));
}
