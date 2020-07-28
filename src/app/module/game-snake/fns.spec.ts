import {fnAnd, fnCompose, fnFlip, fnIdentity, fnKey, fnMap, fnPipe, fnSame, fnSome, fnSum, fnTrace, fnLift2} from './fns';

describe(`fns`, () => {
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

  describe(`fnIdentity`, () => {
    test(`returns same`, () => expect(fnIdentity(123)).toBe(123));
  });

  describe(`fnKey`, () => {
    test(`reads value key first`, () => expect(fnKey('key')({key: 'value'})).toBe('value'));
  });

  describe(`fnLift2`, () => {
    test(`lifts`, () => expect(fnLift2<number, number, number, string>(concatToString)(plusOne)(multTwo)(2)).toBe('3.4'));
  });

  describe(`fnMap`, () => {
    test(`maps`, () => expect(fnMap(plusOne)([1, 2, 3])).toEqual([2, 3, 4]));
    test(`maps null to undefined`, () => expect(fnMap(plusOne)(null)).toEqual(undefined));
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

  describe(`fnTrace`, () => {
    test(`logs and returns same`, () => {
      spyOn(console, 'log');
      expect(fnTrace('tag')(1)).toBe(1);
      expect(console.log).toHaveBeenCalledWith('tag: 1');
    });
  });
});
