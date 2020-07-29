// BASE

export const fnIdentity = <T>(arg: T) => arg;
export const fnTIdentity = <T>() => (arg: T) => fnIdentity(arg);

export const fnTrace = (label: string) => <T>(value: T): T => {
  console.log(`${label || '?'}: ${JSON.stringify(value)}`);
  return value;
};

// COMPOSITION

/** @returns flipped args i.e. `b => a => c` */
export const fnFlip = <T1, T2, R>(fn: (arg1: T1) => (arg2: T2) => R) => (arg2: T2) => (arg1: T1) => fn(arg1)(arg2);

/**
 * Note: basically `fnCompose(f, f1)`
 *
 * @returns `a => r` for `a => f (f1(a)): r`
 */
export const fnLift1 = <R, R1>(fn: (arg1: R1) => R) => <T>(fn1: (arg: T) => R1) => (arg: T) => fn(fn1(arg));

/** @returns `a => r` for `a => f (f1(a)) (f2(a)): r` */
export const fnLift2 = <R, R1, R2>(fn: (arg1: R1) => (arg2: R2) => R) => <T>(fn1: (arg: T) => R1) => (fn2: (arg: T) => R2) => (arg: T) =>
  fn(fn1(arg))(fn2(arg));

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

export function fnCompose<R>(): (arg: R) => R;
export function fnCompose<R, T>(fn: (arg: T) => R): (arg: T) => R;
export function fnCompose<R, T, T1>(fn2: (arg: T1) => R, fn1: (arg: T) => T1): (arg: T) => R;
export function fnCompose<R, T, T1, T2>(fn3: (arg: T2) => R, fn2: (arg: T1) => T2, fn1: (arg: T) => T1): (arg: T) => R;
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
export const fnNot = (arg1: any) => !Boolean(arg1);

export const fnAnd = (arg1: any) => (arg2: any) => Boolean(arg1) && Boolean(arg2);
export const fnOr = (arg1: any) => (arg2: any) => Boolean(arg1) || Boolean(arg2);

// LISTS

export const fnFirst = <T>(vals: T[]) => vals?.[0];

export const fnMap = <T, R>(fn: (arg: T) => R) => (args: T[]): R[] => args?.map((ii) => fn(ii));

export const fnSome = <T>(equals: (aa: T) => (bb: T) => boolean) => (vals: T[]) => (val: T) => vals?.some(equals(val));

// OBJECTS

export const fnKey = <T extends object, K extends keyof T>(key: K) => (val: T) => val?.[key];
export const fnTKey = <T extends object>() => <K extends keyof T>(key: K) => fnKey<T, K>(key);

// MATH

export const fnMult = (arg1: number) => (arg2: number) => arg1 * arg2;
export const fnSum = (arg1: number) => (arg2: number) => arg1 + arg2;
