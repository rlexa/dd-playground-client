import { isEqualValue } from 'app/util';
import { Action, AnyAction, Dispatch } from 'redux';

export class ReduxMutator {
  constructor(
    protected readonly dispatch: Dispatch<AnyAction>,
  ) { }

  protected do = <T>(old: T, val: T, act: (val: T) => Action) => {
    if (!isEqualValue(old, val)) {
      this.dispatch(act(val));
    }
  }
}
