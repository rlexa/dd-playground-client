import {ChangeDetectionStrategy, Component, Inject, OnDestroy} from '@angular/core';
import {DoneSubject, RxCleanup} from 'dd-rxjs';
import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import {distinctUntilChanged, filter, map, shareReplay, takeUntil, withLatestFrom} from 'rxjs/operators';
import {buildSituation1, checkProblems, DEF_FAMEDOWN_STATE_FIELDS, GameDownField, modField} from 'src/app/module/widget/game-down/data';
import {trackByIndex} from 'src/app/util';
import {DiDebugView, DiSceneSelectedIndex, DiTheme} from './di-game-down-values';
import {GameDownService} from './service';

@Component({
  selector: 'app-game-down-config',
  templateUrl: './game-down-config.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDownConfigComponent implements OnDestroy {
  constructor(
    private readonly gameDownService: GameDownService,
    @Inject(DiDebugView) public readonly viewDebug$: BehaviorSubject<boolean>,
    @Inject(DiSceneSelectedIndex) public readonly selectedFieldIndex$: Observable<number>,
    @Inject(DiTheme) public readonly theme$: BehaviorSubject<string>,
  ) {}

  @RxCleanup() private readonly done$ = new DoneSubject();

  readonly factor$ = this.gameDownService.state$.pipe(map((state) => state.scene.factor));
  readonly factorMax$ = this.gameDownService.state$.pipe(map((state) => state.scene.factorMax));
  readonly factorMin$ = this.gameDownService.state$.pipe(map((state) => state.scene.factorMin));
  readonly fields$ = this.gameDownService.state$.pipe(map((state) => state.scene.fields));
  readonly fieldValues$ = this.gameDownService.state$.pipe(map((state) => state.fieldValues));
  readonly renderer$ = this.gameDownService.state$.pipe(map((state) => state.scene.renderer));
  readonly renderers$ = this.gameDownService.state$.pipe(map((state) => state.rendererValues));
  readonly themes$ = this.gameDownService.state$.pipe(
    map((state) => state.themes),
    map((_) => _.map((ii) => ii.name)),
  );

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

  onSetFactor = this.gameDownService.setFactor;
  onSetRenderer = this.gameDownService.setRenderer;
  trackByIndex = trackByIndex;

  onSetTheme = (val: string) => this.theme$.next(val);

  destroy() {}
  ngOnDestroy() {
    this.destroy();
  }

  onSetViewDebug = (val: boolean) => this.viewDebug$.next(val);

  onMergeSelectedFieldWithField = (into: GameDownField, val: string) => this.onMergeSelectedField(into, modField.set(into, val));

  onSetFieldsPresetKey = (key: string) =>
    key in this.sceneFieldsPresets$.value ? this.gameDownService.setFields(this.sceneFieldsPresets$.value[key]) : {};

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
      .subscribe(([_, index]) => this.gameDownService.setField({index, value: {..._.into, ..._.merge}}));
}
