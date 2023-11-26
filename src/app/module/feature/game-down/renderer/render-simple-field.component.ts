import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input, OnDestroy} from '@angular/core';
import {RxCleanup} from 'dd-rxjs';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {FlexboxDirective} from 'src/app/module/directive/flexbox';
import {GameDownColorMap, GameDownField} from '../data';
import {Theme} from '../theme';
import {actorToColor, entityToColor, fieldToColor} from './util';

@Component({
  selector: 'app-render-simple-field',
  templateUrl: './render-simple-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FlexboxDirective],
})
export class RenderSimpleFieldComponent implements OnDestroy {
  @RxCleanup() readonly data$ = new BehaviorSubject<GameDownField>(null);
  @RxCleanup() readonly hovered$ = new BehaviorSubject(false);
  @RxCleanup() readonly selected$ = new BehaviorSubject(false);
  @RxCleanup() readonly theme$ = new BehaviorSubject<Theme<GameDownColorMap>>(null);

  readonly colorActor$ = combineLatest([this.data$, this.theme$]).pipe(map(([data, theme]) => actorToColor(data.actor, theme)));
  readonly colorBorder$ = combineLatest([this.hovered$, this.selected$]).pipe(
    map(([hovered, selected]) => (hovered ? 'black' : selected ? 'red' : 'transparent')),
  );
  readonly colorField$ = combineLatest([this.data$, this.theme$]).pipe(map(([data, theme]) => fieldToColor(data, theme)));
  readonly colorsEntities$ = combineLatest([this.data$, this.theme$]).pipe(
    map(([data, theme]) => (data.entities || []).map((_) => entityToColor(_, theme))),
  );

  @Input() set data(val: GameDownField) {
    this.data$.next(val);
  }
  @Input() set hovered(val: boolean) {
    this.hovered$.next(!!val);
  }
  @Input() set selected(val: boolean) {
    this.selected$.next(!!val);
  }
  @Input() set theme(val: Theme<GameDownColorMap>) {
    this.theme$.next(val);
  }

  destroy() {}
  ngOnDestroy() {
    this.destroy();
  }
}
