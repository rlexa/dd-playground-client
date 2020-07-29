import {
  fnAnd,
  fnCompose,
  fnFlip,
  fnGt,
  fnGte,
  fnIdentity,
  fnIs,
  fnKey,
  fnLift1,
  fnLift2,
  fnLift2to2,
  fnLift2x2,
  fnLt,
  fnLte,
  fnMap,
  fnMult,
  fnNot,
  fnOr,
  fnPipe,
  fnSame,
  fnSome,
  fnSum,
  fnTIdentity,
  fnTKey,
  fnTrace,
} from './fns';

describe(`fns`, () => {
  const mult = (arg1: number) => (arg2: number) => arg1 * arg2;
  const sum = (arg1: number) => (arg2: number) => arg1 + arg2;
  const plusOne = (arg: number) => +arg + 1;
  const multTwo = (arg: number) => +arg * 2;
  const isSame = <T>(aa: T) => (bb: T) => aa === bb;
  const concatToString = <T1, T2>(aa: T1) => (bb: T2) => `${aa}.${bb}`;

  describe(`fnAnd`, () => {
    test(`is true for t&&t`, () => expect(fnAnd(1)(2)).toBe(true));
    test(`is false for t&&f`, () => expect(fnAnd(1)(0)).toBe(false));
    test(`is false for f&&t`, () => expect(fnAnd(0)(1)).toBe(false));
    test(`is false for f&&f`, () => expect(fnAnd(0)(0)).toBe(false));
  });

  describe(`fnCompose`, () => {
    test(`applies identity if no fns`, () => expect(fnCompose<number>()(123)).toBe(123));
    test(`applies single`, () => expect(fnCompose(multTwo)(123)).toBe(multTwo(123)));
    test(`applies right to left`, () => expect(fnCompose(multTwo, plusOne)(123)).toBe(multTwo(plusOne(123))));
  });

  describe(`fnFlip`, () => {
    test(`flips and applies params`, () => expect(fnFlip((aa: number) => (bb: number) => (aa + 1) * bb)(2)(1)).toBe(4));
  });

  describe(`fnGt`, () => {
    test(`is false for 0 1`, () => expect(fnGt(0)(1)).toBe(false));
    test(`is false for 1 1`, () => expect(fnGt(1)(1)).toBe(false));
    test(`is true for 1 0`, () => expect(fnGt(1)(0)).toBe(true));
  });

  describe(`fnGte`, () => {
    test(`is false for 0 1`, () => expect(fnGte(0)(1)).toBe(false));
    test(`is true for 1 1`, () => expect(fnGte(1)(1)).toBe(true));
    test(`is true for 1 0`, () => expect(fnGte(1)(0)).toBe(true));
  });

  describe(`fnIdentity`, () => {
    test(`returns same`, () => expect(fnIdentity(123)).toBe(123));
    test(`returns same (pre-typed)`, () => expect(fnTIdentity<number>()(123)).toBe(123));
  });

  describe(`fnIs`, () => {
    test(`returns true for t`, () => expect(fnIs(1)).toBe(true));
    test(`returns false for f`, () => expect(fnIs(0)).toBe(false));
  });

  describe(`fnKey, fnTKey`, () => {
    test(`reads value by key`, () => expect(fnKey<{key: string}, 'key'>('key')({key: 'value'})).toBe('value'));
    test(`reads value by key (pre-typed)`, () => expect(fnTKey<{key: string}>()('key')({key: 'value'})).toBe('value'));
  });

  describe(`fnLiftx`, () => {
    test(`lifts fnLift1`, () => expect(fnLift1<number, number>(plusOne)(multTwo)(2)).toBe(5));
    test(`lifts fnLift2`, () => expect(fnLift2<string, number, number>(concatToString)(plusOne)(multTwo)(2)).toBe('3.4'));
    test(`lifts fnLift2to2`, () => expect(fnLift2to2<string, number, number>(concatToString)(plusOne)(multTwo)(2)(3)).toBe('3.6'));
    test(`lifts fnLift2x2`, () => expect(fnLift2x2<string, number, number>(concatToString)(mult)(sum)(2)(3)).toBe('6.5'));
  });

  describe(`fnLt`, () => {
    test(`is true for 0 1`, () => expect(fnLt(0)(1)).toBe(true));
    test(`is false for 1 1`, () => expect(fnLt(1)(1)).toBe(false));
    test(`is false for 1 0`, () => expect(fnLt(1)(0)).toBe(false));
  });

  describe(`fnLte`, () => {
    test(`is true for 0 1`, () => expect(fnLte(0)(1)).toBe(true));
    test(`is true for 1 1`, () => expect(fnLte(1)(1)).toBe(true));
    test(`is false for 1 0`, () => expect(fnLte(1)(0)).toBe(false));
  });

  describe(`fnMap`, () => {
    test(`maps`, () => expect(fnMap(plusOne)([1, 2, 3])).toEqual([2, 3, 4]));
    test(`maps null to undefined`, () => expect(fnMap(plusOne)(null)).toEqual(undefined));
  });

  describe(`fnMult`, () => {
    test(`multiplies`, () => expect(fnMult(2)(3)).toEqual(6));
  });

  describe(`fnNot`, () => {
    test(`is true for f`, () => expect(fnNot(0)).toBe(true));
    test(`is false for t`, () => expect(fnNot(1)).toBe(false));
  });

  describe(`fnPipe`, () => {
    test(`applies identity if no fns`, () => expect(fnPipe<number>()(123)).toBe(123));
    test(`applies single`, () => expect(fnPipe(multTwo)(123)).toBe(multTwo(123)));
    test(`applies left to right`, () => expect(fnPipe(multTwo, plusOne)(123)).toBe(plusOne(multTwo(123))));
  });

  describe(`fnSame`, () => {
    test(`is same`, () => expect(fnSame('hi')('hi')).toBe(true));
    test(`is different`, () => expect(fnSame('hi')('ih')).toBe(false));
  });

  describe(`fnSome`, () => {
    test(`finds`, () => expect(fnSome<number>(isSame)([1, 2])(2)).toBe(true));
    test(`finds none`, () => expect(fnSome<number>(isSame)([1, 2])(3)).toBe(false));
    test(`finds none if empty`, () => expect(fnSome<number>(isSame)([])(2)).toBe(false));
  });

  describe(`fnSum`, () => {
    test(`sums`, () => expect(fnSum(1)(2)).toBe(3));
  });

  describe(`fnOr`, () => {
    test(`is true for t||t`, () => expect(fnOr(1)(2)).toBe(true));
    test(`is true for t||f`, () => expect(fnOr(1)(0)).toBe(true));
    test(`is true for f||t`, () => expect(fnOr(0)(1)).toBe(true));
    test(`is false for f||f`, () => expect(fnOr(0)(0)).toBe(false));
  });

  describe(`fnTrace`, () => {
    test(`logs and returns same`, () => {
      spyOn(console, 'log');
      expect(fnTrace('tag')(1)).toBe(1);
      expect(console.log).toHaveBeenCalledWith('tag: 1');
    });
  });
});
