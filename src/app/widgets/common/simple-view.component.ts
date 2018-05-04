import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { isNumeric, isWeb } from 'app/util';
import { WithDataProperty } from 'app/widgets/util';

type CellType = 'url' | 'number' | 'timestamp' | 'json' | 'recursive' | 'string' | 'void';

@Component({
  selector: 'app-simple-view',
  templateUrl: './simple-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleViewComponent extends WithDataProperty<Object> {

  @Input() isWidthConstrained = true;
  @Input() isDense = false;
  @Input() isExpanded = true;
  @Input() isExpandable = false;

  keys: string[] = [];
  types: CellType[] = [];

  protected onDataChange(old: Object, val: Object) {
    this.keys = Object.keys(val || {});
    this.types = this.keys.map(key => this.guessType(val[key]));
  }

  private guessType = (val: any): CellType => val === null || val === undefined ? 'void' :
    typeof val === 'object' ? val instanceof Date ? 'timestamp' : 'recursive' :
      typeof val === 'number' ? 'number' :
        typeof val === 'string' ? isWeb(val) ? 'url' : isNumeric(val) ? 'number' : 'string' : 'json';

}
