import {InjectionToken} from '@angular/core';
import {StateSubject} from 'dd-rxjs';
import {BehaviorSubject} from 'rxjs';

/** GameDown scene hovered index. */
export const DiSceneHoveredIndex = new InjectionToken<BehaviorSubject<number>>('DI GameDown scene hovered index.', {
  providedIn: 'root',
  factory: () => new StateSubject<number>(null),
});

/** GameDown scene selected index. */
export const DiSceneSelectedIndex = new InjectionToken<BehaviorSubject<number>>('DI GameDown scene selected index.', {
  providedIn: 'root',
  factory: () => new StateSubject<number>(null),
});

/** GameDown scene selected index. */
export const DiDebugView = new InjectionToken<BehaviorSubject<boolean>>('DI GameDown debug view.', {
  providedIn: 'root',
  factory: () => new StateSubject<boolean>(false),
});
