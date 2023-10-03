import {inject, InjectionToken, Provider} from '@angular/core';
import {StateSubject} from 'dd-rxjs';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {filter, map, withLatestFrom} from 'rxjs/operators';
import {Vector} from 'src/app/util/fns-vector';
import {Game, initGame, onInputDirection, Preset, processFrame} from './logic-fns';

/** Game state. */
export const DiGameSnake = new InjectionToken<BehaviorSubject<Game>>('DI game state.', {
  providedIn: 'root',
  factory: () => new StateSubject<Game>(null),
});

/** Game preset settings. */
export const DiGameSnakePreset = new InjectionToken<BehaviorSubject<Preset>>('DI game preset settings.', {
  providedIn: 'root',
  factory: () => new StateSubject<Preset>({height: 15, width: 15}),
});

/** Trigger frame event. */
export const DiGameSnakeTriggerDirection = new InjectionToken<Subject<string>>('DI direction event.', {
  providedIn: 'root',
  factory: () => new Subject<string>(),
});

/** Trigger frame event. */
export const DiGameSnakeTriggerFrame = new InjectionToken<Subject<any>>('DI frame event.', {
  providedIn: 'root',
  factory: () => new Subject(),
});

/** Trigger init event. */
export const DiGameSnakeTriggerInit = new InjectionToken<Subject<any>>('DI init event.', {
  providedIn: 'root',
  factory: () => new Subject(),
});

/** Game processors intended for multi DI. */
export const DiGameSnakeProcessors = new InjectionToken<Observable<Game>>('DI game processors.');

/** Processor part for direction. */
export const DiGameSnakeProcessorDirectionProvider: Provider = {
  provide: DiGameSnakeProcessors,
  multi: true,
  useFactory: () =>
    inject(DiGameSnakeTriggerDirection).pipe(
      filter((dir) => ['L', 'U', 'R', 'D'].includes(dir)),
      map((dir) => ({x: dir === 'L' ? -1 : dir === 'R' ? 1 : 0, y: dir === 'U' ? -1 : dir === 'D' ? 1 : 0} as Vector)),
      withLatestFrom(inject(DiGameSnake)),
      filter(([vec, game]) => !!game),
      map(([vec, game]) => onInputDirection(game, vec)),
    ),
};

/** Processor part for frame. */
export const DiGameSnakeProcessorFrameProvider: Provider = {
  provide: DiGameSnakeProcessors,
  multi: true,
  useFactory: () =>
    inject(DiGameSnakeTriggerFrame).pipe(
      withLatestFrom(inject(DiGameSnake)),
      filter(([__, game]) => !!game),
      map(([__, game]) => processFrame(game)),
    ),
};

/** Processor part for init. */
export const DiGameSnakeProcessorInitProvider: Provider = {
  provide: DiGameSnakeProcessors,
  multi: true,
  useFactory: () =>
    inject(DiGameSnakeTriggerInit).pipe(
      withLatestFrom(inject(DiGameSnakePreset)),
      map(([_, preset]) => preset),
      map(initGame),
    ),
};
