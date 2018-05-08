import { Inject, Injectable } from '@angular/core';
import { EqvalueSubject } from 'app/rx';
import { isEqualValue } from 'app/util';
import { Action, Store } from 'redux';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GlobalFlags, actMergeGlobalFlags, actSetGlobalRoute } from './globals';
import { AppState } from './state';
import { AppStore } from './store';
import { DashboardState, actMergeUiDashboard } from './ui';
import { actSetUiAiMlPolynomFactorsCurrent, actSetUiAiMlPolynomFactorsTrained, actSetUiAiMlPolynomLearningRate, actSetUiAiMlPolynomOptimizer, actSetUiAiMlPolynomPointsCurrent } from './ui/ai/ml-polynomial';

type ReduxGetter<T> = (state: AppState) => T;

interface ReduxWatcher<T> {
  getter: ReduxGetter<T>;
  notify: EqvalueSubject<T>;
}

@Injectable()
export class ReduxService {

  state: AppState;
  onStateChange: EqvalueSubject<AppState>;

  private dispatch = this.store.dispatch;

  private watchers: ReduxWatcher<any>[] = [];
  private triggerCheckWatchers = new Subject();

  constructor(@Inject(AppStore) private store: Store<AppState>) {
    this.triggerCheckWatchers.pipe(debounceTime(100)).subscribe(() => this.checkWatchers());
    this.state = this.store.getState();
    this.onStateChange = new EqvalueSubject(this.state);
    store.subscribe(() => this.update());
  }

  // BGN MUTATORS

  mergeGlobalFlags = (val: GlobalFlags) => this.dispatch(actMergeGlobalFlags(val));

  mergeUiDashboard = (val: DashboardState) => this.dispatch(actMergeUiDashboard(val));

  setGlobalRoute = (val: string) => this.do(this.state.globalValues.route, Object.freeze(val), actSetGlobalRoute);

  setMlPolynomialFactorsCurrent = (val: number[]) => this.do(this.state.ui.ai.mlPolynomial.factorsCurrent, val || [], actSetUiAiMlPolynomFactorsCurrent);
  setMlPolynomialFactorsTrained = (val: number[]) => this.do(this.state.ui.ai.mlPolynomial.factorsTrained, val || [], actSetUiAiMlPolynomFactorsTrained);
  setMlPolynomialLearningRate = (val: number) => this.do(this.state.ui.ai.mlPolynomial.learningRate, Math.max(.000001, val || 0), actSetUiAiMlPolynomLearningRate);
  setMlPolynomialOptimizer = (val: string) => this.do(this.state.ui.ai.mlPolynomial.optimizer, val || null, actSetUiAiMlPolynomOptimizer);
  setMlPolynomialPointsCurrent = (val: number[]) => this.do(this.state.ui.ai.mlPolynomial.pointsCurrent, val || [], actSetUiAiMlPolynomPointsCurrent);

  // END MUTATORS

  watch<T>(getter: ReduxGetter<T>) {
    let watcher = this.watchers.find(ii => ii.getter === getter || ii.getter.toString() === getter.toString());
    if (!watcher) {
      watcher = { getter, notify: new EqvalueSubject<T>(this.applyGetter(getter)) };
      this.watchers.push(watcher);
    }
    return watcher.notify as EqvalueSubject<T>;
  }

  private checkWatchers() {
    for (let ii = this.watchers.length - 1; ii >= 0; --ii) {
      if (!this.watchers[ii].notify.observers.length) {
        this.watchers.splice(ii, 1);
      }
    }
  }

  private applyGetter<T>(getter: ReduxGetter<T>): T {
    let ret: T = null;
    try {
      ret = getter(this.state);
    } catch {
      // ignore
    }
    return ret;
  }

  private do<T>(old: T, val: T, act: (val: T) => Action) {
    if (!isEqualValue(old, val)) {
      this.dispatch(act(val));
    }
  }

  private update() {
    this.state = this.store.getState();
    this.onStateChange.next(this.state);
    this.watchers.forEach(ii => ii.notify.next(this.applyGetter(ii.getter)));
    this.triggerCheckWatchers.next();
  }
}
