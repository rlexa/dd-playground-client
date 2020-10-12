import {InjectionToken} from '@angular/core';
import {StateSubject} from 'dd-rxjs';
import {BehaviorSubject} from 'rxjs';

/** UI Dashboard visibility of footer. */
export const DiDashboardVisibilityFooter = new InjectionToken<BehaviorSubject<boolean>>('DI Dashboard Visibility Footer.', {
  providedIn: 'root',
  factory: () => new StateSubject(true),
});
