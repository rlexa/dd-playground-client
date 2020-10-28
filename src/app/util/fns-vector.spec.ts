import {equalVectors, includesVector, isZeroVector, sumVectors} from './fns-vector';

describe(`Vector`, () => {
  describe(`equalVectors`, () => {
    test(`are equal`, () => expect(equalVectors({x: 1, y: 2})({x: 1, y: 2})).toBe(true));
    test(`are different`, () => expect(equalVectors({x: 1, y: 2})({x: 2, y: 1})).toBe(false));
  });

  describe(`includesVector`, () => {
    test(`finds`, () => expect(includesVector([{x: 1, y: 2}])({x: 1, y: 2})).toBe(true));
    test(`finds none`, () => expect(includesVector([{x: 1, y: 2}])({x: 2, y: 1})).toBe(false));
    test(`finds none if empty`, () => expect(includesVector([])({x: 2, y: 1})).toBe(false));
  });

  describe(`isZeroVector`, () => {
    test(`is zero`, () => expect(isZeroVector({x: 0, y: 0})).toBe(true));
    test(`is not zero due to x`, () => expect(isZeroVector({x: 1, y: 0})).toBe(false));
    test(`is not zero due to y`, () => expect(isZeroVector({x: 0, y: 1})).toBe(false));
  });

  describe(`sumVectors`, () => {
    test(`sums`, () => expect(sumVectors({x: 1, y: 2})({x: 2, y: 3})).toEqual({x: 3, y: 5}));
  });
});
