import {not, PreFilter, process, processIf, processIn, Processor, recursiveCopyReduceKeyPath} from './logic';

describe(`helper`, () => {
  const redInc1: Processor<number> = st => st + 1;
  const whenOdd: PreFilter<number> = st => st % 2 !== 0;
  const whenGt3: PreFilter<number> = st => st > 3;

  describe(`process`, () => {
    test(`process one`, () => expect(process(redInc1)(1)).toBe(2));
    test(`process multiple`, () => expect(process(redInc1, redInc1, redInc1)(1)).toBe(4));
  });

  describe(`processIf`, () => {
    test(`processIf one true`, () => expect(processIf(whenOdd)(redInc1)(1)).toBe(2));
    test(`processIf one false`, () => expect(processIf(whenOdd)(redInc1)(2)).toBe(2));

    test(`processIf multiple true`, () => expect(processIf(whenOdd, whenGt3)(redInc1)(5)).toBe(6));
    test(`processIf multiple first false`, () => expect(processIf(whenOdd, whenGt3)(redInc1)(4)).toBe(4));
    test(`processIf multiple second false`, () => expect(processIf(whenOdd, whenGt3)(redInc1)(1)).toBe(1));
  });

  describe(`not`, () => {
    test(`not single true`, () => expect(not(whenOdd)(2)).toBe(true));
    test(`not single false`, () => expect(not(whenOdd)(1)).toBe(false));
    test(`not multiple first true`, () => expect(not(whenOdd, whenGt3)(4)).toBe(true));
    test(`not multiple second true`, () => expect(not(whenOdd, whenGt3)(1)).toBe(true));
    test(`not multiple all true`, () => expect(not(whenOdd, whenGt3)(2)).toBe(true));
    test(`not multiple all false`, () => expect(not(whenOdd, whenGt3)(5)).toBe(false));
  });

  describe(`recursiveCopyReduceKeyPath`, () => {
    test(`reduces to new`, () => {
      const testObj = {aa: {bb: {cc: {}}}};
      const newObj = recursiveCopyReduceKeyPath(testObj, {}, ['aa', 'bb', 'cc']);
      expect(newObj).not.toBe(testObj);
      expect(newObj.aa).not.toBe(testObj.aa);
      expect(newObj.aa.bb).not.toBe(testObj.aa.bb);
      expect(newObj.aa.bb.cc).not.toBe(testObj.aa.bb.cc);
      expect(newObj).toEqual({aa: {bb: {cc: {}}}});
    });
  });

  describe(`processIn`, () => {
    interface TestInterface {
      aa: {bb: {cc: object}};
    }
    const testObj: TestInterface = {aa: {bb: {cc: {}}}};

    test(`reduces with correct params`, () => {
      processIn<TestInterface>()(st => st.aa.bb.cc)((st, top) => {
        expect(st).toBe(testObj.aa.bb.cc);
        expect(top).toBe(testObj);
        return st;
      })(testObj);
    });

    test(`reduces to same`, () => expect(processIn<TestInterface>()(st => st.aa.bb.cc)((st, top) => st)(testObj)).toBe(testObj));

    test(`reduces to new`, () => {
      const newObj = processIn<TestInterface>()(st => st.aa.bb.cc)((st, top) => ({}))(testObj);
      expect(newObj).not.toBe(testObj);
      expect(newObj.aa).not.toBe(testObj.aa);
      expect(newObj.aa.bb).not.toBe(testObj.aa.bb);
      expect(newObj.aa.bb.cc).not.toBe(testObj.aa.bb.cc);
      expect(newObj).toEqual({aa: {bb: {cc: {}}}});
    });
  });
});
