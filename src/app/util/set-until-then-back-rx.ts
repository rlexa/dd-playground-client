import {Observable, of, Subject} from 'rxjs';
import {mapTo, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';

export function setUntilThenBack$<T>(sbj$: Subject<T>, value: T, until$: Observable<any>) {
  return of(value).pipe(
    withLatestFrom(sbj$),
    tap(([current, last]) => sbj$.next(current)),
    switchMap(([current, last]) => until$.pipe(take(1), mapTo(last))),
    tap((last) => sbj$.next(last)),
  );
}
