// BASE

export const fnIdentity = <T>(arg: T) => arg;

export const fnTrace = (label: string) => <T>(value: T): T => {
  console.log(`${label || '?'}: ${JSON.stringify(value)}`);
  return value;
};

// COMPOSITION

export const fnFlip = <T1, T2, R>(fn: (arg1: T1) => (arg2: T2) => R) => (arg2: T2) => (arg1: T1) => fn(arg1)(arg2);

export const fnLift2 = <T, R1, R2, R>(fn: (arg1: R1) => (arg2: R2) => R) => (fn1: (arg: T) => R1) => (fn2: (arg: T) => R2) => (arg: T) =>
  fn(fn1(arg))(fn2(arg));

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

// LOGIC

export const fnAnd = (arg1: any) => (arg2: any) => Boolean(arg1) && Boolean(arg2);

// LISTS

export const fnMap = <T, R>(fn: (arg: T) => R) => (args: T[]): R[] => args?.map((ii) => fn(ii));

export const fnSome = <T>(equals: (aa: T) => (bb: T) => boolean) => (vals: T[]) => (val: T) => vals?.some(equals(val));

// OBJECTS

export const fnKey = <T extends object, K extends keyof T>(key: K) => (val: T) => val?.[key];
export const fnTKey = <T extends object>() => <K extends keyof T>(key: K) => fnKey<T, K>(key);

// MATH

export const fnSum = (arg1: number) => (arg2: number) => arg1 + arg2;
