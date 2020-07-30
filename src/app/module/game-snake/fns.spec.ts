import {
  fnAnd,
  fnCompose,
  fnDefault,
  fnFirst,
  fnFlip,
  fnFloor,
  fnGt,
  fnGte,
  fnHead,
  fnIdentity,
  fnInvert,
  fnIs,
  fnKey,
  fnLast,
  fnLift1,
  fnLift2,
  fnLift2to2,
  fnLift2x2,
  fnLt,
  fnLte,
  fnMap,
  fnMerge,
  fnMod,
  fnMult,
  fnNot,
  fnOr,
  fnPipe,
  fnRandom,
  fnRandomInt,
  fnSame,
  fnSome,
  fnSum,
  fnTail,
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

  describe(`fnDefault`, () => {
    test(`defaults for null`, () => expect(fnDefault(1)(null)).toBe(1));
    test(`defaults for undefined`, () => expect(fnDefault(1)(undefined)).toBe(1));
    test(`defaults not for 0`, () => expect(fnDefault(1)(0)).toBe(0));
    test(`defaults not for ''`, () => expect(fnDefault('1')('')).toBe(''));
  });

  describe(`fnFirst`, () => {
    test(`returns first for [.]`, () => expect(fnFirst([1, 2, 3])).toBe(1));
    test(`returns undefined for []`, () => expect(fnFirst([])).toBe(undefined));
    test(`returns undefined for undefined`, () => expect(fnFirst(undefined)).toBe(undefined));
  });

  describe(`fnFlip`, () => {
    test(`flips and applies params`, () => expect(fnFlip((aa: number) => (bb: number) => (aa + 1) * bb)(2)(1)).toBe(4));
  });

  describe(`fnFloor`, () => {
    test(`floors`, () => expect(fnFloor(1.5)).toBe(1));
    test(`floors undefined to NaN`, () => expect(fnFloor(undefined)).toBe(NaN));
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

  describe(`fnHead`, () => {
    test(`returns head for [.]`, () => expect(fnHead([1, 2, 3])).toEqual([1, 2]));
    test(`returns undefined for []`, () => expect(fnHead([])).toEqual([]));
    test(`returns undefined for undefined`, () => expect(fnHead(undefined)).toBe(undefined));
  });

  describe(`fnIdentity`, () => {
    test(`returns same`, () => expect(fnIdentity(123)).toBe(123));
    test(`returns same (pre-typed)`, () => expect(fnTIdentity<number>()(123)).toBe(123));
  });

  describe(`fnInvert`, () => {
    test(`inverts + to -`, () => expect(fnInvert(1)).toBe(-1));
    test(`inverts - to +`, () => expect(fnInvert(-1)).toBe(1));
  });

  describe(`fnIs`, () => {
    test(`returns true for t`, () => expect(fnIs(1)).toBe(true));
    test(`returns false for f`, () => expect(fnIs(0)).toBe(false));
  });

  describe(`fnKey, fnTKey`, () => {
    test(`reads value by key`, () => expect(fnKey<{key: string}, 'key'>('key')({key: 'value'})).toBe('value'));
    test(`reads value by key (pre-typed)`, () => expect(fnTKey<{key: string}>()('key')({key: 'value'})).toBe('value'));
  });

  describe(`fnLast`, () => {
    test(`returns last for [.]`, () => expect(fnLast([1, 2, 3])).toBe(3));
    test(`returns undefined for []`, () => expect(fnLast([])).toBe(undefined));
    test(`returns undefined for undefined`, () => expect(fnLast(undefined)).toBe(undefined));
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

  describe(`fnMerge`, () => {
    test(`merges`, () => expect(fnMerge({a: 1, b: 2})({b: 3, c: 4} as any)).toEqual({a: 1, b: 3, c: 4}));
  });

  describe(`fnMod`, () => {
    test(`modulo`, () => expect(fnMod(3)(2)).toEqual(1));
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

  describe(`fnRandom, fnRandomInt`, () => {
    test(`fnRandom returns random`, () => {
      spyOn(Math, 'random').and.returnValue(0.5);
      expect(fnRandom()).toBe(0.5);
    });

    test(`fnRandomInt returns random int`, () => {
      spyOn(Math, 'random').and.returnValue(0.5);
      expect(fnRandomInt(10)).toBe(5);
    });
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

  describe(`fnTail`, () => {
    test(`returns tail for [.]`, () => expect(fnTail([1, 2, 3])).toEqual([2, 3]));
    test(`returns undefined for []`, () => expect(fnTail([])).toEqual([]));
    test(`returns undefined for undefined`, () => expect(fnTail(undefined)).toBe(undefined));
  });

  describe(`fnTrace`, () => {
    test(`logs and returns same`, () => {
      spyOn(console, 'log');
      expect(fnTrace('tag')(1)).toBe(1);
      expect(console.log).toHaveBeenCalledWith('tag: 1');
    });
  });
});
