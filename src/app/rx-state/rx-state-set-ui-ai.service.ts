import { Injectable } from '@angular/core';
import { set_polynomial_factorsCurrent, set_polynomial_factorsTrained, set_polynomial_learningRate, set_polynomial_optimizer, set_polynomial_pointsCurrent, set_tfjs_backend, set_tfjs_memory } from 'app/rx-state/state/state-ai';
import { orArray, orNull, orObject } from 'dd-rx-state';
import { RxStateService } from './rx-state.service';

@Injectable({ providedIn: 'root' })
export class RxStateSetUiAiService {
  constructor(private readonly rxState: RxStateService) { }

  setMlPolynomialFactorsCurrent = this.rxState.act_(set_polynomial_factorsCurrent, orArray);
  setMlPolynomialFactorsTrained = this.rxState.act_(set_polynomial_factorsTrained, orArray);
  setMlPolynomialLearningRate = this.rxState.act_(set_polynomial_learningRate, val => Math.max(.000001, val || 0));
  setMlPolynomialOptimizer = this.rxState.act_(set_polynomial_optimizer, orNull);
  setMlPolynomialPointsCurrent = this.rxState.act_(set_polynomial_pointsCurrent, orArray);

  setTfjsBackend = this.rxState.act_(set_tfjs_backend, orNull);
  setTfjsMemory = this.rxState.act_(set_tfjs_memory, orObject);
}
