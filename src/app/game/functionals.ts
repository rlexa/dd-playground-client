export type Processor<T, TOP = T> = (val: T, top?: TOP) => T;
/** Chain processing (B works on result of A) */
export const process = <T>(...processors: Processor<T>[]): Processor<T> => (val: T) =>
  processors.reduce((acc, processor) => processor(acc), val);

const checkIfAnds = <T>(val: T, ...ifAnds: PreFilter<T>[]) => ifAnds.reduce((acc, ifThen) => (acc ? ifThen(val) : acc), true);

export type PreFilter<T> = (val: T) => boolean;
/** AND logic. */
export const processIf = <T>(...ifAnds: PreFilter<T>[]) => (...processors: Processor<T>[]): Processor<T> => (val: T) =>
  checkIfAnds(val, ...ifAnds) ? process(...processors)(val) : val;

/** OR logic. */
export const not = <T>(...ifAnds: PreFilter<T>[]): PreFilter<T> => (val: T) => !checkIfAnds(val, ...ifAnds);

/** Will do: `{...state, a: {...state.a, b: nestedNew}}` for `state={a:{b:any}}` and `keyPath=['a','b']` */
export const recursiveCopyReduceKeyPath = <T>(state: T, nestedNew: any, keyPath: string[]): T => {
  if (!keyPath.length) {
    return nestedNew;
  }
  return {...state, [keyPath[0]]: recursiveCopyReduceKeyPath(state[keyPath[0]], nestedNew, keyPath.slice(1))};
};

/**
 * @param selector must be simple path select arrow-function e.g. `obj => obj.a.b.c`
 * @param reducer `top` is top state in case it's needed for calculations
 */
export const processIn = <T>() => <V>(selector: (st: T) => V) => (reducer: Processor<V, T>): Processor<T> => (state: T) => {
  const nested = selector(state);
  const nestedNew = reducer(nested, state);
  if (nested !== nestedNew) {
    const keys = selector
      .toString()
      .split('=>')[1]
      .trim()
      .split('.')
      .slice(1);
    return recursiveCopyReduceKeyPath(state, nestedNew, keys);
  }
  return state;
};
