import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {TRIGGER_WOBBLE_X} from 'src/app/animations';
import {FORMAT_DATE_TIMESTAMP} from 'src/app/presets';
import {isNumeric, isWeb, WithDataProperty} from 'src/app/util';
import {map} from 'rxjs/operators';

type CellType = 'url' | 'number' | 'timestamp' | 'json' | 'recursive' | 'string' | 'void' | 'array';

@Component({
  selector: 'app-simple-view',
  templateUrl: './simple-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [TRIGGER_WOBBLE_X],
})
export class SimpleViewComponent extends WithDataProperty<object> implements OnDestroy {
  readonly FORMAT_DATE_TIMESTAMP = FORMAT_DATE_TIMESTAMP;

  readonly keys$ = this.data$.pipe(map(_ => Object.keys(_ || {})));
  readonly types$ = this.keys$.pipe(map(_ => _.map(key => this.data$.value[key]).map(this.guessType)));
  readonly clickables$ = this.data$.pipe(
    map(_ =>
      Object.entries(_ || {}).reduce<Record<string, boolean>>(
        (acc, [key, value]) => ({...acc, [key]: !this.isClickable ? false : this.isClickable(key, value)}),
        {},
      ),
    ),
  );

  @Input() isWidthConstrained = true;
  @Input() isClickable: (key: string, val: any) => boolean = null;
  @Input() isDense = false;
  @Input() isExpanded = true;
  @Input() isExpandable = false;
  @Input() subheader: string = null;

  @Output() clicked = new EventEmitter<{key: string; value: any}>();

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onClicked = (key: string, value: any) => this.clicked.emit({key, value});

  private guessType = (val: any): CellType =>
    val === null || val === undefined
      ? 'void'
      : typeof val === 'object'
      ? val instanceof Date
        ? 'timestamp'
        : Array.isArray(val)
        ? 'array'
        : 'recursive'
      : typeof val === 'number'
      ? 'number'
      : typeof val === 'string'
      ? isWeb(val)
        ? 'url'
        : isNumeric(val)
        ? 'number'
        : 'string'
      : 'json';
}
