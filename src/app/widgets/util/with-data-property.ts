import { Input, ElementRef, AfterViewChecked } from '@angular/core';
import { FORMAT_DATE, FORMAT_DATE_TIMESTAMP } from 'app/presets';

export class WithDataProperty<T> {

  readonly dateFormat = FORMAT_DATE;
  readonly timestampFormat = FORMAT_DATE_TIMESTAMP;

  get data() { return this.model; }
  @Input() set data(value: T) {
    if (this.model !== value) {
      const old = this.model;
      this.model = value;
      this.onDataChange(old, this.model);
    }
  }

  model: T = null;

  protected onDataChange(old: T, val: T) { };
}
