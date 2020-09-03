import {InjectionToken} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {StateSubject} from 'src/app/util/state-subject';

/** UI Dashboard visibility of header. */
export const DiSceneHoveredIndex = new InjectionToken<BehaviorSubject<number>>('DI GameDown scene hovered index.', {
  providedIn: 'root',
  factory: () => new StateSubject<number>(null),
});
