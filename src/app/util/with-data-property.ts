import {Input, OnDestroy} from '@angular/core';
import {RxCleanup} from 'dd-rxjs';
import {BehaviorSubject} from 'rxjs';

export class WithDataProperty<T> implements OnDestroy {
  @RxCleanup() readonly data$ = new BehaviorSubject<T>(null);
  @Input() set data(val: T) {
    this.data$.next(val);
  }
  ngOnDestroy() {}
}
