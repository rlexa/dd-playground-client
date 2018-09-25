import { Input, OnDestroy } from '@angular/core';
import { rxComplete } from 'app/rx';
import { BehaviorSubject } from 'rxjs';

export class WithDataProperty<T> implements OnDestroy {
  readonly data$ = new BehaviorSubject(<T>null);
  @Input() set data(val: T) { this.data$.next(val); }
  ngOnDestroy() { rxComplete(this.data$); }
}
