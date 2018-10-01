import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { Theme } from 'app/game';
import { GameDownColorMap, GameDownStateField } from 'app/redux/game/down';
import { DoneSubject, rxComplete } from 'app/rx';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { fieldToColor } from './util';

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

  readonly colorBorder$ = combineLatest(this.hovered$, this.selected$).pipe(map(([hovered, selected]) => hovered ? 'black' : selected ? 'red' : 'transparent'));
  readonly colorField$ = combineLatest(this.data$, this.theme$).pipe(map(([data, theme]) => fieldToColor(data, theme)));

  @Input() set data(val: GameDownStateField) { this.data$.next(val); }
  @Input() set hovered(val: boolean) { this.hovered$.next(!!val); }
  @Input() set selected(val: boolean) { this.selected$.next(!!val); }
  @Input() set theme(val: Theme<GameDownColorMap>) { this.theme$.next(val); }

  ngOnDestroy() {
    this.done$.done();
    rxComplete(this.data$, this.hovered$, this.selected$, this.theme$);
  }
}
