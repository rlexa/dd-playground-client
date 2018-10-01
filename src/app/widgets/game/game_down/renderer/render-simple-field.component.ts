import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { Theme, themeColor, themeColor_ } from 'app/game';
import { FIELD_GROUND, FIELD_WATER, GameDownColorMap, GameDownStateField } from 'app/redux/game/down';
import { DoneSubject, rxComplete } from 'app/rx';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

const fieldToColor = (data: GameDownStateField, theme: Theme<GameDownColorMap>) => !data || !theme ? null :
  themeColor(theme, _ => data.field === FIELD_GROUND ? _.fieldGround : data.field === FIELD_WATER ? _.fieldWater : null);

@Component({
  selector: 'app-render-simple-field',
  templateUrl: './render-simple-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RenderSimpleFieldComponent implements OnDestroy {
  private readonly done$ = new DoneSubject();

  readonly data$ = new BehaviorSubject(<GameDownStateField>null);
  readonly hovered$ = new BehaviorSubject(false);
  readonly selected$ = new BehaviorSubject(false);
  readonly theme$ = new BehaviorSubject(<Theme<GameDownColorMap>>null);

  readonly colorBg$ = this.theme$.pipe(map(themeColor_(ii => ii.fieldBackground)));
  readonly colorField$ = combineLatest(this.data$, this.theme$).pipe(map(([data, theme]) => fieldToColor(data, theme)));

  readonly colorBorder$ = combineLatest(this.hovered$, this.selected$).pipe(map(([hovered, selected]) => hovered ? 'black' : selected ? 'red' : 'transparent'));

  @Input() set data(val: GameDownStateField) { this.data$.next(val); }
  @Input() set hovered(val: boolean) { this.hovered$.next(!!val); }
  @Input() set selected(val: boolean) { this.selected$.next(!!val); }
  @Input() set theme(val: Theme<GameDownColorMap>) { this.theme$.next(val); }

  ngOnDestroy() {
    this.done$.done();
    rxComplete(this.data$, this.hovered$, this.selected$, this.theme$);
  }
}
