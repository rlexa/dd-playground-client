import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { isEqualValue } from 'app/util';

export class EqvalueSubject<T> extends BehaviorSubject<T> {
  next(value: T) {
    if (this.value !== value) {
      super.next(value);
    }
  }
}
