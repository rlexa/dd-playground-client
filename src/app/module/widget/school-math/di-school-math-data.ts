import {InjectionToken} from '@angular/core';
import {StateSubject} from 'dd-rxjs';
import {BehaviorSubject} from 'rxjs';

/** Current math data seed. */
export const DiSchoolMathSeed = new InjectionToken<BehaviorSubject<number>>('DI math data seed.', {
  providedIn: 'root',
  factory: () => new StateSubject<number>(1),
});
