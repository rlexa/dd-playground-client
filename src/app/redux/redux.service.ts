import { Inject, Injectable, OnDestroy } from '@angular/core';
import { isEqualValue } from 'app/util';
import { Store } from 'redux';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { AppState } from './state';
import { AppStore } from './store';

export type ReduxGetter<T> = (state: AppState) => T;

interface ReduxWatcher<T> {
  blocker: Subject<any>[];
  getter: ReduxGetter<T>;
  notify: BehaviorSubject<T>;
}

@Injectable({ providedIn: 'root' })
export class ReduxService implements OnDestroy {
  constructor(
    @Inject(AppStore) protected readonly store: Store<AppState>,
  ) {
    this.triggerCheckWatchers$.pipe(debounceTime(this.DEBOUNCE_CHECK_WATCHERS_MS), takeUntil(this.done$)).subscribe(this.checkWatchers);
    this.state = this.store.getState();
  }

  private readonly done$ = new Subject();
  private readonly triggerCheckWatchers$ = new Subject();
  private readonly sbsStore = this.store.subscribe(() => this.update());
  protected readonly DEBOUNCE_CHECK_WATCHERS_MS = 100;
  protected readonly watchers = <ReduxWatcher<any>[]>[];
  private blockers = <Subject<any>[]>[];
  state: AppState;

  ngOnDestroy() {
    this.sbsStore();
    this.done$.next();
    this.done$.complete();
    [this.triggerCheckWatchers$, ...this.watchers.map(ii => ii.notify)].forEach(ii => ii.complete());
  }

  watch = <T>(getter: ReduxGetter<T>, until?: Subject<any>) => {
    let watcher = this.watchers.find(ii => ii.getter === getter || ii.getter.toString() === getter.toString());
    if (!watcher) {
      watcher = { getter, notify: new BehaviorSubject(this.applyGetter(getter)), blocker: [] };
      this.watchers.push(watcher);
    }
    if (until && !until.isStopped && !watcher.blocker.includes(until)) {
      watcher.blocker = [...watcher.blocker, until];
      if (!this.blockers.includes(until)) {
        this.blockers = [...this.blockers, until];
        until
          .pipe(takeUntil(until), takeUntil(this.done$))
          .subscribe(null, null, () => {
            this.blockers = this.blockers.filter(_ => _ !== until);
            this.triggerCheckWatchers$.next();
          });
      }
    }
    return watcher.notify as BehaviorSubject<T>;
  }

  private checkWatchers = () => {
    for (let ii = this.watchers.length - 1; ii >= 0; --ii) {
      this.watchers[ii].blocker = this.watchers[ii].blocker.filter(_ => !_.isStopped && this.blockers.includes(_));
      if (!this.watchers[ii].notify.observers.length && !this.watchers[ii].blocker.length) {
        [...this.watchers.splice(ii, 1).map(ww => ww.notify)].forEach(jj => jj.complete());
      }
    }
  }

  private applyGetter = <T>(getter: ReduxGetter<T>) => {
    let ret: T = null;
    try {
      ret = getter(this.state);
    } catch {
      // ignore
    }
    return ret;
  }

  private update = () => {
    this.state = this.store.getState();
    this.watchers.forEach(ii => {
      const val = this.applyGetter(ii.getter);
      const isObject = typeof val === 'object' && typeof ii.notify.value === 'object';
      if (isObject && !isEqualValue(val, ii.notify.value) || !isObject && val !== ii.notify.value) {
        ii.notify.next(val);
      }
    });
    this.triggerCheckWatchers$.next();
  }
}

export class DebugReduxService extends ReduxService {
  dbgGetCheckWatchersMs = () => this.DEBOUNCE_CHECK_WATCHERS_MS;
  dbgGetStore = () => this.store;
  dbgGetWatchers = () => this.watchers.length;
}
