import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TRIGGER_WobbleX } from 'app/animations';
import { FORMAT_DATE_TIMESTAMP } from 'app/presets';
import { isNumeric, isWeb, WithDataProperty } from 'app/util';
import { map } from 'rxjs/operators';

type CellType = 'url' | 'number' | 'timestamp' | 'json' | 'recursive' | 'string' | 'void';

@Component({
  selector: 'app-simple-view',
  templateUrl: './simple-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [TRIGGER_WobbleX],
})
export class SimpleViewComponent extends WithDataProperty<Object>  {
  readonly FORMAT_DATE_TIMESTAMP = FORMAT_DATE_TIMESTAMP;

  readonly keys$ = this.data$.pipe(map(_ => Object.keys(_ || {})));
  readonly types$ = this.keys$.pipe(map(_ => _.map(key => this.data$.value[key]).map(this.guessType)));
  readonly clickables$ = this.data$.pipe(map(_ => Object.entries(_ || {})
    .reduce((acc, [key, value]) => ({ ...acc, [key]: !this.isClickable ? false : this.isClickable(key, value) }), <{ [key: string]: boolean }>{})));

  @Input() isWidthConstrained = true;
  @Input() isClickable: (key: string, val: any) => boolean = null;
  @Input() isDense = false;
  @Input() isExpanded = true;
  @Input() isExpandable = false;
  @Input() subheader = <string>null;

  @Output() clicked = new EventEmitter<{ key: string, value: any }>();

  onClicked = (key: string, value: any) => this.clicked.emit({ key, value });

  private guessType = (val: any): CellType => val === null || val === undefined ? 'void' :
    typeof val === 'object' ? val instanceof Date ? 'timestamp' : 'recursive' :
      typeof val === 'number' ? 'number' :
        typeof val === 'string' ? isWeb(val) ? 'url' : isNumeric(val) ? 'number' : 'string' : 'json';

}
