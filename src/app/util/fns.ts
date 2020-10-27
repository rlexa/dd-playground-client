// BASE

/** @returns `arg` converted to `() => arg` */
export const fnFn = <T>(arg: T) => () => arg;

export const fnIdentity = <T>(arg: T) => arg;
export const fnTIdentity = <T>() => (arg: T) => fnIdentity(arg);

export const fnDefault = <T>(def: T) => (arg: T) => arg ?? def;

export const fnTrace = (label: string) => <T>(value: T): T => {
  console.log(`${label || '?'}: ${JSON.stringify(value)}`);
  return value;
};

// COMPOSITION

/** @returns `fn(arg1)(arg2)` result. */
export const fnApply2 = <T1>(arg1: T1) => <T2>(arg2: T2) => <R>(fn: (arg1: T1) => (arg2: T2) => R) => fn(arg1)(arg2);
export const fnApplyFn2 = <T1, T2, R>(fn: (arg1: T1) => (arg2: T2) => R) => (arg1: T1) => (arg2: T2) => fnApply2(arg1)(arg2)(fn);

/** @returns flipped args i.e. `b => a => c` */
export const fnFlip = <T1, T2, R>(fn: (arg1: T1) => (arg2: T2) => R) => (arg2: T2) => (arg1: T1) => fn(arg1)(arg2);

/** @returns `a => r` for `a => f (f1(a)) (f2(a)): r` */
export const fnLift2 = <R, R1, R2>(fn: (arg1: R1) => (arg2: R2) => R) => <T>(fn1: (arg: T) => R1) => (fn2: (arg: T) => R2) => (arg: T) =>
  fn(fn1(arg))(fn2(arg));

/** @returns `a => r` for `a => f (f1(a)) (a): r` */
export const fnLift1 = <R, R1, T>(fn: (arg1: R1) => (arg2: T) => R) => (fn1: (arg: T) => R1) => fnLift2(fn)(fn1)(fnIdentity);

/** @returns `a => b => r` for `a => b => f (f1(a)) (f2(b)): r` */
export const fnLift2to2 = <R, R1, R2>(fn: (arg1: R1) => (arg2: R2) => R) => <T1>(fn1: (arg: T1) => R1) => <T2>(fn2: (arg: T2) => R2) => (
  arg1: T1,
) => (arg2: T2) => fn(fn1(arg1))(fn2(arg2));

/** @returns `a => b => r` for `a => b => f (f1(a)(b)) (f2(a)(b)): r` */
export const fnLift2x2 = <R, R1, R2>(fn: (arg1: R1) => (arg2: R2) => R) => <T1, T2>(fn1: (arg1: T1) => (arg2: T2) => R1) => (
  fn2: (arg1: T1) => (arg2: T2) => R2,
) => (arg1: T1) => (arg2: T2) => fn(fn1(arg1)(arg2))(fn2(arg1)(arg2));

export function fnPipe<R>(): (arg: R) => R;
export function fnPipe<R, T>(fn: (arg: T) => R): (arg: T) => R;
export function fnPipe<R, T, T1>(fn1: (arg: T) => T1, fn2: (arg: T1) => R): (arg: T) => R;
export function fnPipe<R, T, T1, T2>(fn1: (arg: T) => T1, fn2: (arg: T1) => T2, fn3: (arg: T2) => R): (arg: T) => R;
export function fnPipe(...funcs: ((arg: any) => any)[]) {
  return <T>(arg1: T) => funcs.reduce((acc, fn) => fn(acc), fnIdentity(arg1));
}

/** A pipe for same type-in-type-out functions. */
export function fnProcess<T>(...fns: ((arg: T) => T)[]) {
  return (val: T) => fns.reduce((acc, fn) => fn(acc), val);
}

export const fnProcessIf = <T>(...ands: ((arg: T) => boolean)[]) => (...fns: ((arg: T) => T)[]) => (value: T) =>
  fnAndFns(...ands)(value) ? fnProcess(...fns)(value) : value;

export function fnCompose<R>(): (arg: R) => R;
export function fnCompose<R, T>(fn: (arg: T) => R): (arg: T) => R;
export function fnCompose<R, T, T1>(fn2: (arg: T1) => R, fn1: (arg: T) => T1): (arg: T) => R;
export function fnCompose<R, T, T1, T2>(fn3: (arg: T2) => R, fn2: (arg: T1) => T2, fn1: (arg: T) => T1): (arg: T) => R;
export function fnCompose<R, T, T1, T2, T3>(
  fn4: (arg: T3) => R,
  fn3: (arg: T2) => T3,
  fn2: (arg: T1) => T2,
  fn1: (arg: T) => T1,
): (arg: T) => R;
export function fnCompose<R, T, T1, T2, T3, T4>(
  fn5: (arg: T4) => R,
  fn4: (arg: T3) => T4,
  fn3: (arg: T2) => T3,
  fn2: (arg: T1) => T2,
  fn1: (arg: T) => T1,
): (arg: T) => R;
export function fnCompose(...funcs: ((arg: any) => any)[]) {
  return <T>(arg1: T) => funcs.reduceRight((acc, fn) => fn(acc), fnIdentity(arg1));
}

// COMPARE

export const fnSame = <T>(arg1: T) => (arg2: T) => arg1 === arg2;
export const fnGt = <T>(arg1: T) => (arg2: T) => arg1 > arg2;
export const fnGte = <T>(arg1: T) => (arg2: T) => arg1 >= arg2;
export const fnLt = <T>(arg1: T) => (arg2: T) => arg1 < arg2;
export const fnLte = <T>(arg1: T) => (arg2: T) => arg1 <= arg2;

// LOGIC

export const fnIs = (arg1: any) => Boolean(arg1);

export const fnAnd = (arg1: any) => (arg2: any) => fnIs(arg1) && fnIs(arg2);
export const fnAnds = (...args: any[]) => (args || []).reduce<boolean>((acc, ii) => fnAnd(acc)(ii), true);
export const fnAndFns = <T = any>(...ands: ((arg: T) => boolean)[]) => (value: T): boolean => {
  for (const fn of ands) {
    if (!fn?.(value)) {
      return false;
    }
  }
  return true;
};

export const fnOr = (arg1: any) => (arg2: any) => fnIs(arg1) || fnIs(arg2);
export const fnOrs = (...args: any[]) => (!args ? true : args.reduce<boolean>((acc, ii) => fnOr(acc)(ii), false));
export const fnOrFns = <T = any>(...ors: ((arg: T) => boolean)[]) => (value: T): boolean => {
  for (const fn of ors) {
    if (fn?.(value)) {
      return true;
    }
  }
  return false;
};

export const fnNot = (arg1: any) => !fnIs(arg1);
export const fnNotFn = <T, V>(fn: (arg: T) => V) => fnCompose(fnNot, fn);
export const fnNotFns = <T = any>(...ands: ((arg: T) => boolean)[]) => fnCompose(fnNot, fnAndFns(...ands));

export const fnIfThenElse = (condition: boolean) => <T1>(thenResult: T1) => <T2>(elseResult: T2) => (condition ? thenResult : elseResult);
export const fnThenElseIf = <T1>(thenResult: T1) => <T2>(elseResult: T2) => (condition: boolean) =>
  fnIfThenElse(condition)(thenResult)(elseResult);
export const fnThenIfElse = <T1>(thenResult: T1) => (condition: boolean) => <T2>(elseResult: T2) =>
  fnIfThenElse(condition)(thenResult)(elseResult);
export const fnElseThenIf = <T2>(elseResult: T2) => <T1>(thenResult: T1) => (condition: boolean) =>
  fnIfThenElse(condition)(thenResult)(elseResult);

// LISTS

export const fnArr = <T>(val: T) => [val];
export const fnFirst = <T>(vals: T[]) => vals?.[0];
export const fnHead = <T>(vals: T[]) => vals?.slice(0, -1);
export const fnJoin = (separator: string) => <T>(vals: T[]) => vals?.join(separator);
export const fnLast = <T>(vals: T[]) => vals?.pop();
export const fnTail = <T>(vals: T[]) => vals?.slice(1);

export const fnAddFirst = <T>(val: T) => (vals: T[]) => (vals ? [val, ...vals] : [val]);
export const fnAddLast = <T>(val: T) => (vals: T[]) => (vals ? [...vals, val] : [val]);

export const fnLen = <T extends {length: number}>(vals: T) => vals?.length;

export const fnFilter = <T>(fn: (arg: T) => boolean) => (args: T[]): T[] => args?.filter((ii) => fn(ii));
export const fnMap = <T, R>(fn: (arg: T) => R) => (args: T[]): R[] => args?.map((ii) => fn(ii));
export const fnMapIndexed = <T, R>(fn: (index: number) => (arg: T) => R) => (args: T[]): R[] => args?.map((ii, index) => fn(index)(ii));

export const fnReduce = <R>(init: R) => <T>(fn: (index: number) => (accumulate: R) => (item: T) => R) => (from: T[]) =>
  from?.reduce<R>((acc, ii, index) => fn(index)(acc)(ii), init);

export const fnSome = <T>(equals: (aa: T) => (bb: T) => boolean) => (vals: T[]) => (val: T) => vals?.some(equals(val));

// OBJECTS

export const fnKey = <T extends object, K extends keyof T>(key: K) => (val: T) => val?.[key];
export const fnTKey = <T extends object>() => <K extends keyof T>(key: K) => fnKey<T, K>(key);

/** Merges `{}` < `baseValue` < `overwriteWith` */
export const fnMerge = <T extends object>(baseValue?: Partial<T>) => (overwriteWith?: Partial<T>): T =>
  ({...(baseValue || {}), ...(overwriteWith || {})} as T);

/** Merges `{}` < `baseValue` < `overwriteWith` */
export const fnRMerge = <T extends object>(overwriteWith?: Partial<T>) => (baseValue?: Partial<T>): T => fnMerge(baseValue)(overwriteWith);

export const fnGetter = <T extends object, K extends keyof T>(key: K) => (obj: T) => obj?.[key];
export const fnSetter = <T extends object, K extends keyof T>(key: K) => (value: T[K]) => (baseValue?: Partial<T>): T =>
  typeof baseValue === 'object' && baseValue !== null && baseValue[key] === value
    ? (baseValue as T)
    : fnRMerge<T>({[key]: value} as T)(baseValue);

export interface FnWrap<T, V> {
  getter: (obj: T) => V;
  setter: (val: V) => (obj: T) => T;
}
export const fnWrap = <T, V>(getter: (obj: T) => V) => (setter: (val: V) => (obj: T) => T): FnWrap<T, V> => ({getter, setter});
export const fnWrapKey = <T extends object, K extends keyof T>(key: K) => fnWrap<T, T[K]>(fnGetter(key))(fnSetter(key));
export const fnWrapGet = <T, V>(wrap: FnWrap<T, V>) => wrap.getter;
export const fnWrapSet = <T, V>(wrap: FnWrap<T, V>) => wrap.setter;

export const fnWrapIn = <T, T1>(wrapIn: FnWrap<T, T1>) => <V>(wrap: FnWrap<T1, V>): FnWrap<T, V> => {
  const getter = fnCompose(fnWrapGet(wrap), fnWrapGet(wrapIn));
  const setter = (val: V) => (obj: T) => fnWrapSet(wrapIn)(fnWrapSet(wrap)(val)(fnWrapGet(wrapIn)(obj)))(obj);
  return fnWrap(getter)(setter);
};

// MATH

export const fnRandom = () => Math.random();
export const fnRandomInt = (arg: number) => Math.floor(fnRandom() * arg);

export const fnAbs = (arg: number) => Math.abs(arg);
export const fnFloor = (arg: number) => Math.floor(arg);
export const fnSum = (arg1: number) => (arg2: number) => arg1 + arg2;
export const fnMod = (arg1: number) => (arg2: number) => arg1 % arg2;
export const fnMult = (arg1: number) => (arg2: number) => arg1 * arg2;
export const fnDiv = (arg1: number) => (arg2: number) => arg1 / arg2;
export const fnSin = (arg: number) => Math.sin(arg);

export const fnInvert = (arg: number) => -arg;

export const fnFloat = (arg: number) => (arg < 0 ? arg - 1 - fnFloor(arg) : arg - fnFloor(arg));
export const fnSub = (arg1: number) => (arg2: number) => fnSum(arg1)(fnInvert(arg2));

// STRING

export const fnPadEnd = (padWith: string) => (maxLen: number) => (val: string) => val.padEnd(maxLen, padWith);
export const fnPadStart = (padWith: string) => (maxLen: number) => (val: string) => val.padStart(maxLen, padWith);
export const fnSplit = (separator: string | RegExp) => (val: string) => val.split(separator);

// LOOP

export interface FnRecur {
  fnRecur: (...values: any[]) => FnRecur;
  values: any[];
}
export const fnRecur = (...values: any[]) => ({fnRecur, values} as FnRecur);

export const fnLoop = <T>(fn: (...values: any[]) => T | FnRecur) => {
  let result = fn();
  while ((result as FnRecur)?.fnRecur === fnRecur) {
    result = fn(...(result as FnRecur).values);
  }
  return result as T;
};

export const fnWhileDo = <T>(fnContinue: (arg: T) => boolean) => (fn: (arg: T) => T) => (init: T): T =>
  fnLoop((result = init) => (fnContinue(result) ? fnRecur(fn(result)) : result));

export const fnRepeat = (times: number) => <T, R>(fn: (arg: T) => R) => (init: R): R =>
  fnLoop((counter = times, result = init) => (counter <= 0 ? result : fnRecur(counter - 1, fn(result))));

export const fnCompareGenerateOther = <T>(compare: (aa: T) => (bb: T) => boolean) => (generate: (current: T) => T) => (otherThanThat: T) =>
  fnWhileDo(compare(otherThanThat))(generate)(otherThanThat);

export const fnGenerateOther = fnCompareGenerateOther(fnSame);
