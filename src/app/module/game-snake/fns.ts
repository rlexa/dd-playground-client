// BASE

export const fnIdentity = <T>(arg: T) => arg;

// COMPOSITION

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

// LISTS

export const fnSome = <T>(equals: (aa: T) => (bb: T) => boolean) => (vals: T[]) => (val: T) => vals?.some(equals(val));

// OBJECTS

export const fnKeyFrom = <T extends object>(key: keyof T) => (val: T) => val?.[key];
export const fnFromKey = <T extends object>(val: T) => (key: keyof T) => fnKeyFrom(key)(val);

// MATH

export const fnSum = (arg1: number) => (arg2: number) => arg1 + arg2;
