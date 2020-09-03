import {InjectionToken} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {StateSubject} from 'src/app/util/state-subject';

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
