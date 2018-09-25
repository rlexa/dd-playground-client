import { Inject, Injectable } from '@angular/core';
import { actMergeGlobalFlags, actSetGlobalRoute, GlobalFlags } from 'app/redux/globals';
import { actMergeUiDashboard, DashboardState } from 'app/redux/ui';
import { actSetUiAiMlPolynomFactorsCurrent, actSetUiAiMlPolynomFactorsTrained, actSetUiAiMlPolynomLearningRate, actSetUiAiMlPolynomOptimizer, actSetUiAiMlPolynomPointsCurrent } from 'app/redux/ui/ai/ml-polynomial';
import { Store } from 'redux';
import { ReduxMutator } from './redux-mutator';
import { AppState } from './state';
import { AppStore } from './store';

@Injectable({ providedIn: 'root' })
export class ReduxSetService extends ReduxMutator {
  constructor(@Inject(AppStore) private readonly store: Store<AppState>, ) { super(store.dispatch); }

  private state = () => this.store.getState();

  mergeGlobalFlags = (val: GlobalFlags) => this.dispatch(actMergeGlobalFlags(val));

  mergeUiDashboard = (val: DashboardState) => this.dispatch(actMergeUiDashboard(val));

  setGlobalRoute = (val: string) => this.do(this.state().globalValues.route, Object.freeze(val), actSetGlobalRoute);

  setMlPolynomialFactorsCurrent = (val: number[]) => this.do(this.state().ui.ai.mlPolynomial.factorsCurrent, val || [], actSetUiAiMlPolynomFactorsCurrent);
  setMlPolynomialFactorsTrained = (val: number[]) => this.do(this.state().ui.ai.mlPolynomial.factorsTrained, val || [], actSetUiAiMlPolynomFactorsTrained);
  setMlPolynomialLearningRate = (val: number) => this.do(this.state().ui.ai.mlPolynomial.learningRate, Math.max(.000001, val || 0), actSetUiAiMlPolynomLearningRate);
  setMlPolynomialOptimizer = (val: string) => this.do(this.state().ui.ai.mlPolynomial.optimizer, val || null, actSetUiAiMlPolynomOptimizer);
  setMlPolynomialPointsCurrent = (val: number[]) => this.do(this.state().ui.ai.mlPolynomial.pointsCurrent, val || [], actSetUiAiMlPolynomPointsCurrent);
}
