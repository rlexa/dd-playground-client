import {randomize} from './math-test-generator';

describe(`math-test-generator`, () => {
  describe(`randomize`, () => {
    test(`returns function`, () => expect(typeof randomize(123) === 'function').toBeTruthy());
    test(`returns random function with stable seed results`, () => expect(randomize(123)()).toBe(0.9650931040878277));
  });
});
