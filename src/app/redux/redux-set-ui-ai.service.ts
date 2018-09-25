import { Inject, Injectable } from '@angular/core';
import { actSetUiAiMlPolynomFactorsCurrent, actSetUiAiMlPolynomFactorsTrained, actSetUiAiMlPolynomLearningRate, actSetUiAiMlPolynomOptimizer, actSetUiAiMlPolynomPointsCurrent } from 'app/redux/ui/ai/ml-polynomial';
import { Store } from 'redux';
import { ReduxMutator } from './redux-mutator';
import { AppState } from './state';
import { AppStore } from './store';

@Injectable({ providedIn: 'root' })
export class ReduxSetUiAiService extends ReduxMutator {
  constructor(@Inject(AppStore) private readonly store: Store<AppState>, ) { super(store.dispatch); }

  private state = () => this.store.getState().ui.ai;

  setMlPolynomialFactorsCurrent = (val: number[]) => this.do(this.state().mlPolynomial.factorsCurrent, val || [], actSetUiAiMlPolynomFactorsCurrent);
  setMlPolynomialFactorsTrained = (val: number[]) => this.do(this.state().mlPolynomial.factorsTrained, val || [], actSetUiAiMlPolynomFactorsTrained);
  setMlPolynomialLearningRate = (val: number) => this.do(this.state().mlPolynomial.learningRate, Math.max(.000001, val || 0), actSetUiAiMlPolynomLearningRate);
  setMlPolynomialOptimizer = (val: string) => this.do(this.state().mlPolynomial.optimizer, val || null, actSetUiAiMlPolynomOptimizer);
  setMlPolynomialPointsCurrent = (val: number[]) => this.do(this.state().mlPolynomial.pointsCurrent, val || [], actSetUiAiMlPolynomPointsCurrent);
}
