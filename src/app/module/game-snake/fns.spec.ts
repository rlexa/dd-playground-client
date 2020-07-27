import {fnCompose, fnFromKey, fnIdentity, fnKeyFrom, fnPipe, fnSame, fnSome, fnSum} from './fns';

describe(`fns`, () => {
  const plusOne = (arg: number) => +arg + 1;
  const multTwo = (arg: number) => +arg * 2;
  const isSame = <T>(aa: T) => (bb: T) => aa === bb;

  describe(`fnCompose`, () => {
    test(`applies identity if no fns`, () => expect(fnCompose<number>()(123)).toBe(123));
    test(`applies single`, () => expect(fnCompose(multTwo)(123)).toBe(multTwo(123)));
    test(`applies right to left`, () => expect(fnCompose(multTwo, plusOne)(123)).toBe(multTwo(plusOne(123))));
  });

  describe(`fnIdentity`, () => {
    test(`returns same`, () => expect(fnIdentity(123)).toBe(123));
  });

  describe(`fnKeyFrom, fnFromKey`, () => {
    test(`reads value key first`, () => expect(fnKeyFrom('key')({key: 'value'})).toBe('value'));
    test(`reads value key last`, () => expect(fnFromKey({key: 'value'})('key')).toBe('value'));
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
});
