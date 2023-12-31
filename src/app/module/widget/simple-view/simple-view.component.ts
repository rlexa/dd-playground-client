import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {RxCleanup} from 'dd-rxjs';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {TRIGGER_WOBBLE_X} from 'src/app/animations';
import {FORMAT_DATE_TIMESTAMP} from 'src/app/presets';
import {isNumeric, isWeb} from 'src/app/util';
import {IconPipe} from '../../pipe/icon';
import {RipupperPipe} from '../../pipe/ripupper';
import {StartuppercasePipe} from '../../pipe/startuppercase';

type CellType = 'url' | 'number' | 'timestamp' | 'json' | 'recursive' | 'string' | 'void' | 'array';

@Component({
  selector: 'app-simple-view',
  templateUrl: './simple-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [TRIGGER_WOBBLE_X],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatListModule, IconPipe, RipupperPipe, StartuppercasePipe],
})
export class SimpleViewComponent<T> implements OnDestroy {
  readonly FORMAT_DATE_TIMESTAMP = FORMAT_DATE_TIMESTAMP;

  @RxCleanup() readonly data$ = new BehaviorSubject<T>(null);
  @Input() set data(val: T) {
    this.data$.next(val);
  }

  readonly keys$ = this.data$.pipe(map((_) => Object.keys(_ || {})));
  readonly types$ = this.keys$.pipe(map((_) => _.map((key) => this.data$.value[key]).map(this.guessType)));
  readonly clickables$ = this.data$.pipe(
    map((_) =>
      Object.entries(_ || {}).reduce<Record<string, boolean>>(
        (acc, [key, value]) => ({...acc, [key]: !this.isClickable ? false : this.isClickable(key, value)}),
        {},
      ),
    ),
  );

  @Input() isWidthConstrained?: boolean | null = true;
  @Input() isClickable?: ((key: string, val: any) => boolean) | null;
  @Input() isDense?: boolean | null;
  @Input() isExpanded?: boolean | null = true;
  @Input() isExpandable?: boolean | null;
  @Input() subheader?: string | null;

  @Output() readonly clicked = new EventEmitter<{key: string; value: any}>();

  destroy() {}
  ngOnDestroy() {
    this.destroy();
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
