import {DoneSubject} from 'dd-rxjs';
import {Subject} from 'rxjs';

export interface Completeable {
  complete?(): void;
  unsubscribe?(): void;
}

export function cleanupRx(...args: (Subject<any> | DoneSubject | Completeable)[]) {
  args?.forEach((val) => {
    if (val instanceof DoneSubject) {
      val.done();
    } else if (val instanceof Subject) {
      if (!val.isStopped) {
        val.complete();
      }
    } else if (typeof val === 'object' && !!val) {
      if (typeof val.unsubscribe === 'function') {
        val.unsubscribe();
      } else if (typeof val.complete === 'function') {
        val.complete();
      }
    }
  });
}
