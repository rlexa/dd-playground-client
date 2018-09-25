import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FORMAT_DATE_TIMESTAMP } from 'app/presets';
import { isNumeric, isWeb } from 'app/util';
import { WithDataProperty } from 'app/widgets/util';
import { map } from 'rxjs/operators';

type CellType = 'url' | 'number' | 'timestamp' | 'json' | 'recursive' | 'string' | 'void';

@Component({
  selector: 'app-simple-view',
  templateUrl: './simple-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleViewComponent extends WithDataProperty<Object>  {
  readonly FORMAT_DATE_TIMESTAMP = FORMAT_DATE_TIMESTAMP;

  readonly keys$ = this.data$.pipe(map(_ => Object.keys(_ || {})));
  readonly types$ = this.keys$.pipe(map(_ => _.map(key => this.data$.value[key]).map(this.guessType)));

  @Input() isWidthConstrained = true;
  @Input() isDense = false;
  @Input() isExpanded = true;
  @Input() isExpandable = false;

  private guessType = (val: any): CellType => val === null || val === undefined ? 'void' :
    typeof val === 'object' ? val instanceof Date ? 'timestamp' : 'recursive' :
      typeof val === 'number' ? 'number' :
        typeof val === 'string' ? isWeb(val) ? 'url' : isNumeric(val) ? 'number' : 'string' : 'json';

}
