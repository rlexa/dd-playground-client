import {not, PreFilter, process, processIf, Processor} from './logic';

describe(`helper`, () => {
  const redInc1: Processor<number> = st => st + 1;
  const whenOdd: PreFilter<number> = st => st % 2 !== 0;
  const whenGt3: PreFilter<number> = st => st > 3;

  test(`process one`, () => expect(process(redInc1)(1)).toBe(2));
  test(`process multiple`, () => expect(process(redInc1, redInc1, redInc1)(1)).toBe(4));

  test(`processIf one true`, () => expect(processIf(whenOdd)(redInc1)(1)).toBe(2));
  test(`processIf one false`, () => expect(processIf(whenOdd)(redInc1)(2)).toBe(2));

  test(`processIf multiple true`, () => expect(processIf(whenOdd, whenGt3)(redInc1)(5)).toBe(6));
  test(`processIf multiple first false`, () => expect(processIf(whenOdd, whenGt3)(redInc1)(4)).toBe(4));
  test(`processIf multiple second false`, () => expect(processIf(whenOdd, whenGt3)(redInc1)(1)).toBe(1));

  test(`not single`, () => expect(not(whenOdd)(2)).toBe(true));
});
