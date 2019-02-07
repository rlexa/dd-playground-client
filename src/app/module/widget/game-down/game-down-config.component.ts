import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { build_Situation_1, checkProblems, DEF_GameDownStateFields, GameDownField } from 'app/module/widget/game-down/data';
import { RxStateService, RxStateSetGameDownService } from 'app/rx-state';
import { trackByIndex } from 'app/util';
import { DoneSubject, RxCleanup } from 'dd-rxjs';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { filter, map, shareReplay, takeUntil } from 'rxjs/operators';

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
  readonly fields$ = this.rxState.watch(state => state.game.down.scene.fields, this.done$);
  readonly fieldValues$ = this.rxState.watch(state => state.game.down.fieldValues, this.done$);
  readonly renderer$ = this.rxState.watch(state => state.game.down.scene.renderer, this.done$);
  readonly renderers$ = this.rxState.watch(state => state.game.down.rendererValues, this.done$);
  readonly selectedFieldIndex$ = this.rxState.watch(state => state.game.down.scene.selectedIndex, this.done$);
  readonly theme$ = this.rxState.watch(state => state.game.down.scene.theme, this.done$);
  readonly themes$ = this.rxState.watch(state => state.game.down.themes, this.done$).pipe(map(_ => _.map(ii => ii.name)));
  readonly viewDebug$ = this.rxState.watch(state => state.game.down.viewDebug, this.done$);

  readonly selectedField$ = combineLatest(this.selectedFieldIndex$, this.fields$)
    .pipe(map(([index, fields]) => fields[index] || null), takeUntil(this.done$));
  readonly selectedFieldActor$ = this.selectedField$.pipe(map(_ => !_ ? null : _.actor));
  readonly selectedFieldEntities$ = this.selectedField$.pipe(map(_ => !_ ? null : _.entities));

  @RxCleanup() readonly sceneFieldsPresets$ = new BehaviorSubject<{ [key: string]: GameDownField[] }>(
    {
      'Default': [...DEF_GameDownStateFields],
      'Situation 1': build_Situation_1(),
    });
  readonly sceneFieldsPresetsKeys$ = this.sceneFieldsPresets$.pipe(map(Object.keys));

  private readonly fieldsProblems$ = this.fields$.pipe(map(checkProblems), shareReplay());
  readonly fieldsProblemsCount$ = this.fieldsProblems$.pipe(map(_ => _.filter(pp => pp.length).length), shareReplay());
  readonly fieldProblems$ = combineLatest(this.selectedFieldIndex$, this.fieldsProblems$)
    .pipe(map(([selectedFieldIndex, fieldsProblems]) => selectedFieldIndex < 0 ? [] : fieldsProblems[selectedFieldIndex]), takeUntil(this.done$));

  onSetFactor = this.rxStateMutate.setSceneFactor;
  onSetRenderer = this.rxStateMutate.setSceneRenderer;
  onSetTheme = this.rxStateMutate.setSceneTheme;
  onSetViewDebug = this.rxStateMutate.setViewDebug;

  trackByIndex = trackByIndex;

  ngOnDestroy() { }

  onMergeSelectedField_Field = (into: GameDownField, field: string) => this.onMergeSelectedField(into, { field });

  onSetFieldsPresetKey = (key: string) => key in this.sceneFieldsPresets$.value ? this.rxStateMutate.setSceneFields(this.sceneFieldsPresets$.value[key]) : {};

  private onMergeSelectedField = (into: GameDownField, merge: GameDownField) => of({ into, merge, index: this.selectedFieldIndex$.value })
    .pipe(filter(_ => Object.keys(merge).length > 0 && Object.keys(merge).every(key => key in into)))
    .subscribe(_ => this.rxStateMutate.setSceneField(_.index, { ..._.into, ..._.merge }));
}
