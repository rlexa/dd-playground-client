import {InjectionToken} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

/** UI Dashboard visibility of header. */
export const DiDashboardVisibilityHeader = new InjectionToken<BehaviorSubject<boolean>>('DI Dashboard Visibility Header.', {
  providedIn: 'root',
  factory: () => new BehaviorSubject(true),
});

/** UI Dashboard visibility of footer. */
export const DiDashboardVisibilityFooter = new InjectionToken<BehaviorSubject<boolean>>('DI Dashboard Visibility Footer.', {
  providedIn: 'root',
  factory: () => new BehaviorSubject(true),
});

/** UI Dashboard visibility of sidebar. */
export const DiDashboardVisibilitySidebar = new InjectionToken<BehaviorSubject<boolean>>('DI Dashboard Visibility Sidebar.', {
  providedIn: 'root',
  factory: () => new BehaviorSubject(true),
});
