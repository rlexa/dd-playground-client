import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {watch} from 'dd-rx-state';
import {DoneSubject, RxCleanup} from 'dd-rxjs';
import {BehaviorSubject, combineLatest, of} from 'rxjs';
import {distinctUntilChanged, filter, map, shareReplay, takeUntil, withLatestFrom} from 'rxjs/operators';
import {buildSituation1, checkProblems, DEF_FAMEDOWN_STATE_FIELDS, GameDownField, modField} from 'src/app/module/widget/game-down/data';
import {RxStateService, RxStateSetGameDownService} from 'src/app/rx-state';
import {trackByIndex} from 'src/app/util';

@Component({
  selector: 'app-game-down-config',
  templateUrl: './game-down-config.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDownConfigComponent implements OnDestroy {
  constructor(private readonly rxState: RxStateService, private readonly rxStateMutate: RxStateSetGameDownService) {}

  @RxCleanup() private readonly done$ = new DoneSubject();

  readonly factor$ = this.rxState.state$.pipe(watch((state) => state.game.down.scene.factor));
  readonly factorMax$ = this.rxState.state$.pipe(watch((state) => state.game.down.scene.factorMax));
  readonly factorMin$ = this.rxState.state$.pipe(watch((state) => state.game.down.scene.factorMin));
  readonly fields$ = this.rxState.state$.pipe(watch((state) => state.game.down.scene.fields));
  readonly fieldValues$ = this.rxState.state$.pipe(watch((state) => state.game.down.fieldValues));
  readonly renderer$ = this.rxState.state$.pipe(watch((state) => state.game.down.scene.renderer));
  readonly renderers$ = this.rxState.state$.pipe(watch((state) => state.game.down.rendererValues));
  readonly selectedFieldIndex$ = this.rxState.state$.pipe(watch((state) => state.game.down.scene.selectedIndex));
  readonly theme$ = this.rxState.state$.pipe(watch((state) => state.game.down.scene.theme));
  readonly themes$ = this.rxState.state$.pipe(
    watch((state) => state.game.down.themes),
    map((_) => _.map((ii) => ii.name)),
  );
  readonly viewDebug$ = this.rxState.state$.pipe(watch((state) => state.game.down.viewDebug));

  readonly selectedField$ = combineLatest([this.selectedFieldIndex$, this.fields$]).pipe(
    map(([index, fields]) => fields[index] || null),
    distinctUntilChanged(),
    shareReplay(),
    takeUntil(this.done$),
  );
  readonly selectedFieldField$ = this.selectedField$.pipe(map(modField.get));
  readonly selectedFieldActor$ = this.selectedField$.pipe(map((_) => (!_ ? null : _.actor)));
  readonly selectedFieldEntities$ = this.selectedField$.pipe(map((_) => (!_ ? null : _.entities)));

  @RxCleanup() readonly sceneFieldsPresets$ = new BehaviorSubject<{[key: string]: GameDownField[]}>({
    Default: [...DEF_FAMEDOWN_STATE_FIELDS],
    'Situation 1': buildSituation1(),
  });
  readonly sceneFieldsPresetsKeys$ = this.sceneFieldsPresets$.pipe(map(Object.keys));

  private readonly fieldsProblems$ = this.fields$.pipe(map(checkProblems), shareReplay());
  readonly fieldsProblemsCount$ = this.fieldsProblems$.pipe(
    map((_) => _.filter((pp) => pp.length).length),
    shareReplay(),
  );
  readonly fieldProblems$ = combineLatest([this.selectedFieldIndex$, this.fieldsProblems$]).pipe(
    map(([selectedFieldIndex, fieldsProblems]) => (selectedFieldIndex < 0 ? [] : fieldsProblems[selectedFieldIndex])),
    takeUntil(this.done$),
  );

  onSetFactor = this.rxStateMutate.setSceneFactor;
  onSetRenderer = this.rxStateMutate.setSceneRenderer;
  onSetTheme = this.rxStateMutate.setSceneTheme;
  onSetViewDebug = this.rxStateMutate.setViewDebug;

  trackByIndex = trackByIndex;

  ngOnDestroy() {}

  onMergeSelectedFieldWithField = (into: GameDownField, val: string) => this.onMergeSelectedField(into, modField.set(into, val));

  onSetFieldsPresetKey = (key: string) =>
    key in this.sceneFieldsPresets$.value ? this.rxStateMutate.setSceneFields(this.sceneFieldsPresets$.value[key]) : {};

  private onMergeSelectedField = (into: GameDownField, merge: GameDownField) =>
    of({into, merge})
      .pipe(
        withLatestFrom(this.selectedFieldIndex$),
        filter(
          ([_, index]) =>
            Object.keys(merge).length > 0 &&
            Object.keys(merge).every((key) => key in into) &&
            Object.keys(merge).some((key) => into[key] !== merge[key]),
        ),
      )
      .subscribe(([_, index]) => this.rxStateMutate.setSceneField(index, {..._.into, ..._.merge}));
}
