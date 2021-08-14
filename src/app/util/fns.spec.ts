import {
  fnAbs,
  fnAddFirst,
  fnAddLast,
  fnAnd,
  fnAnds,
  fnApply2,
  fnCompareGenerateOther,
  fnCompose,
  fnDefault,
  fnDiv,
  fnFilter,
  fnFirst,
  fnFlip,
  fnFloat,
  fnFloor,
  fnFn,
  fnGetter,
  fnGt,
  fnGte,
  fnHead,
  fnIdentity,
  fnIfThenElse,
  fnIndexOf,
  fnInvert,
  fnIs,
  fnJoin,
  fnLast,
  fnLen,
  fnLift1,
  fnLift2,
  fnLift2to2,
  fnLift2x2,
  fnLt,
  fnLte,
  fnMapIndexed,
  fnMax,
  fnMerge,
  fnMin,
  fnMinMax,
  fnMod,
  fnMult,
  fnNot,
  fnOr,
  fnOrs,
  fnPadEnd,
  fnPadStart,
  fnPipe,
  fnProcessApply,
  fnProcessApplyScoped,
  fnRandom,
  fnRandomInt,
  fnReduceIndexed,
  fnRepeat,
  fnRMerge,
  fnSame,
  fnSetter,
  fnSin,
  fnSome,
  fnSplit,
  fnSub,
  fnSum,
  fnTail,
  fnTIdentity,
  fnTrace,
  fnWhileDo,
  fnWrap,
  fnWrapGet,
  fnWrapIn,
  fnWrapKey,
  fnWrapSet,
} from './fns';

describe(`fns`, () => {
  const mult = (arg1: number) => (arg2: number) => arg1 * arg2;
  const sum = (arg1: number) => (arg2: number) => arg1 + arg2;
  const plusOne = (arg: number) => +arg + 1;
  const multTwo = (arg: number) => +arg * 2;
  const isSame =
    <T>(aa: T) =>
    (bb: T) =>
      aa === bb;
  const concatToString =
    <T1, T2>(aa: T1) =>
    (bb: T2) =>
      `${aa}.${bb}`;

  describe(`fnAbs`, () => {
    test(`uses Math.abs`, () => {
      jest.spyOn(Math, 'abs');
      expect(fnAbs(-123)).toBe(123);
      expect(Math.abs).toHaveBeenCalledWith(-123);
    });
  });

  describe(`fnAddFirst`, () => {
    test(`adds first for undefined`, () => expect(fnAddFirst(1)(undefined)).toEqual([1]));
    test(`adds first for []`, () => expect(fnAddFirst(1)([])).toEqual([1]));
    test(`adds first for [.]`, () => expect(fnAddFirst(1)([2, 3])).toEqual([1, 2, 3]));
  });

  describe(`fnAddLast`, () => {
    test(`adds first for undefined`, () => expect(fnAddLast(1)(undefined)).toEqual([1]));
    test(`adds first for []`, () => expect(fnAddLast(1)([])).toEqual([1]));
    test(`adds first for [.]`, () => expect(fnAddLast(1)([2, 3])).toEqual([2, 3, 1]));
  });

  describe(`fnAnd`, () => {
    test(`is true for t&&t`, () => expect(fnAnd(1)(2)).toBe(true));
    test(`is false for t&&f`, () => expect(fnAnd(1)(0)).toBe(false));
    test(`is false for f&&t`, () => expect(fnAnd(0)(1)).toBe(false));
    test(`is false for f&&f`, () => expect(fnAnd(0)(0)).toBe(false));

    describe(`fnAnds`, () => {
      test(`is true for t,t`, () => expect(fnAnds(1, 2)).toBe(true));
      test(`is false for t,f`, () => expect(fnAnds(1, 0)).toBe(false));
    });
  });

  describe(`fnApply2`, () => {
    test(`applies`, () => expect(fnApply2(2)(3)(sum)).toBe(5));
  });

  describe(`fnCompareGenerateOtherThan`, () => {
    test(`generates next`, () => expect(fnCompareGenerateOther((aa) => (bb) => aa === bb)(plusOne)(1)).toBe(2));
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

  describe(`fnDiv`, () => {
    test(`divides`, () => expect(fnDiv(4)(2)).toEqual(2));
  });

  describe(`fnFilter`, () => {
    test(`null for null`, () => expect(fnFilter(Boolean)(null)).toBe(undefined));
    test(`undefined for undefined`, () => expect(fnFilter(Boolean)(null)).toBe(undefined));
    test(`filters`, () => expect(fnFilter(Boolean)([0, 1, false, true, '', 'text'])).toEqual([1, true, 'text']));
  });

  describe(`fnFirst`, () => {
    test(`returns first for [.]`, () => expect(fnFirst([1, 2, 3])).toBe(1));
    test(`returns undefined for []`, () => expect(fnFirst([])).toBe(undefined));
    test(`returns undefined for undefined`, () => expect(fnFirst(undefined)).toBe(undefined));
  });

  describe(`fnFlip`, () => {
    test(`flips and applies params`, () => expect(fnFlip((aa: number) => (bb: number) => (aa + 1) * bb)(2)(1)).toBe(4));
  });

  describe(`fnFloat`, () => {
    test(`floats positive`, () => expect(fnFloat(1.123)).toBe(0.123));
    test(`floats negative`, () => expect(fnFloat(-1.123)).toBe(-0.12300000000000022));
  });

  describe(`fnFloor`, () => {
    test(`floors`, () => expect(fnFloor(1.5)).toBe(1));
    test(`floors undefined to NaN`, () => expect(fnFloor(undefined)).toBe(NaN));
  });

  describe(`fnFn`, () => {
    test(`returns function`, () => expect(fnFn(123)()).toBe(123));
  });

  describe(`fnGetter`, () => {
    test(`gets`, () => expect(fnGetter<{key: string}, 'key'>('key')({key: 'value'})).toBe('value'));
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

  describe(`fnIfThenElse`, () => {
    test(`returns then`, () => expect(fnIfThenElse(true)(1)(0)).toBe(1));
    test(`returns else`, () => expect(fnIfThenElse(false)(1)(0)).toBe(0));
  });

  describe(`fnIndexOf`, () => {
    test(`finds none in undefined`, () => expect(fnIndexOf(fnSame)(undefined)(1)).toBe(undefined));
    test(`finds none in []`, () => expect(fnIndexOf(fnSame)([])(1)).toBe(-1));
    test(`finds in [.]`, () => expect(fnIndexOf(fnSame)([0, 1, 2])(1)).toBe(1));
  });

  describe(`fnInvert`, () => {
    test(`inverts + to -`, () => expect(fnInvert(1)).toBe(-1));
    test(`inverts - to +`, () => expect(fnInvert(-1)).toBe(1));
  });

  describe(`fnIs`, () => {
    test(`returns true for t`, () => expect(fnIs(1)).toBe(true));
    test(`returns false for f`, () => expect(fnIs(0)).toBe(false));
  });

  describe(`fnJoin`, () => {
    test(`returns '|..' for [.]`, () => expect(fnJoin('|')([1, 2, 3])).toEqual('1|2|3'));
    test(`returns '' for []`, () => expect(fnJoin(',')([])).toEqual(''));
    test(`returns undefined for undefined`, () => expect(fnJoin(',')(undefined)).toBe(undefined));
  });

  describe(`fnLast`, () => {
    test(`returns last for [.]`, () => expect(fnLast([1, 2, 3])).toBe(3));
    test(`returns undefined for []`, () => expect(fnLast([])).toBe(undefined));
    test(`returns undefined for undefined`, () => expect(fnLast(undefined)).toBe(undefined));
  });

  describe(`fnLen`, () => {
    test(`returns for [.]`, () => expect(fnLen([1, 2, 3])).toBe(3));
    test(`returns for 'asd'`, () => expect(fnLen('123')).toBe(3));
    test(`returns undefined for undefined`, () => expect(fnLen(undefined)).toBe(undefined));
  });

  describe(`fnLiftx`, () => {
    test(`lifts fnLift1`, () => expect(fnLift1(sum)(plusOne)(2)).toBe(5));
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

  describe(`fnMapIndexed`, () => {
    const toIndex = (index: number) => (item: any) => index;
    test(`maps`, () => expect(fnMapIndexed(toIndex)([1, 1, 1])).toEqual([0, 1, 2]));
    test(`maps null to undefined`, () => expect(fnMapIndexed(toIndex)(null)).toEqual(undefined));
  });

  describe(`fnMax`, () => {
    test(`takes max`, () => expect(fnMax(2)(5)).toBe(5));
  });

  describe(`fnMerge, fnRMerge`, () => {
    test(`merges`, () => expect(fnMerge({a: 1, b: 2})({b: 3, c: 4} as any)).toEqual({a: 1, b: 3, c: 4}));
    test(`merges-r`, () => expect(fnRMerge({b: 3, c: 4} as any)({a: 1, b: 2})).toEqual({a: 1, b: 3, c: 4}));
  });

  describe(`fnMin`, () => {
    test(`takes min`, () => expect(fnMin(2)(5)).toBe(2));
  });

  describe(`fnMinMax`, () => {
    test(`takes min`, () => expect(fnMinMax(2)(5)(1)).toBe(2));
    test(`takes max`, () => expect(fnMinMax(2)(5)(6)).toBe(5));
    test(`takes value`, () => expect(fnMinMax(2)(5)(3)).toBe(3));
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

  describe(`fnPadEnd`, () => {
    test(`pads`, () => expect(fnPadEnd('-=-')(7)('123')).toBe('123-=--'));
  });

  describe(`fnPadStart`, () => {
    test(`pads`, () => expect(fnPadStart('-=-')(7)('123')).toBe('-=--123'));
  });

  describe(`fnPipe`, () => {
    test(`applies identity if no fns`, () => expect(fnPipe<number>()(123)).toBe(123));
    test(`applies single`, () => expect(fnPipe(multTwo)(123)).toBe(multTwo(123)));
    test(`applies left to right`, () => expect(fnPipe(multTwo, plusOne)(123)).toBe(plusOne(multTwo(123))));
  });

  describe(`fnProcessApply`, () => {
    test(`processes`, () => {
      interface CounterLabeled {
        counter: number;
        label: string;
      }
      const setValue = (counter: number) => (obj: CounterLabeled) => ({...obj, counter});
      const setValueInScope = fnProcessApply(setValue)(multTwo);
      expect(setValueInScope(2)({counter: 5, label: 'hello'})).toEqual({counter: 4, label: 'hello'});
    });
  });

  describe(`fnProcessApplyScoped`, () => {
    test(`processes`, () => {
      interface CounterLabeled {
        counter: number;
        label: string;
      }
      const setValue = (counter: number) => (obj: CounterLabeled) => ({...obj, counter});
      const addOnTop = (add: number) => (obj: CounterLabeled) => obj.counter + add;
      const addValueInScope = fnProcessApplyScoped(setValue)(addOnTop);
      expect(addValueInScope(2)({counter: 1, label: 'hello'})).toEqual({counter: 3, label: 'hello'});
    });
  });

  describe(`fnRandom, fnRandomInt`, () => {
    test(`fnRandom returns random`, () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.5);
      expect(fnRandom()).toBe(0.5);
    });

    test(`fnRandomInt returns random int`, () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.5);
      expect(fnRandomInt(10)).toBe(5);
    });
  });

  describe(`fnReduceIndexed`, () => {
    test(`reduces`, () =>
      expect(fnReduceIndexed('')((index) => (acc) => (ii) => `${acc},${index}:${ii}`)(['a', 'b', 'c'])).toBe(',0:a,1:b,2:c'));
  });

  describe(`fnRepeat`, () => {
    test(`repeats`, () => expect(fnRepeat(10)(plusOne)(0)).toBe(10));
  });

  describe(`fnSame`, () => {
    test(`is same`, () => expect(fnSame('hi')('hi')).toBe(true));
    test(`is different`, () => expect(fnSame('hi')('ih')).toBe(false));
  });

  describe(`fnSetter`, () => {
    test(`sets if value different`, () => {
      const source = {key: 'oldValue'};
      const target = fnSetter<{key: string}, 'key'>('key')('value')(source);
      expect(target).toEqual({key: 'value'});
      expect(target).not.toBe(source);
    });

    test(`sets if base is null`, () => expect(fnSetter<{key: string}, 'key'>('key')('value')(null)).toEqual({key: 'value'}));

    test(`ignores if value same`, () => {
      const base = {key: 'value'};
      expect(fnSetter<{key: string}, 'key'>('key')('value')(base)).toBe(base);
    });
  });

  describe(`fnSin`, () => {
    test(`uses Math.sin`, () => {
      jest.spyOn(Math, 'sin');
      expect(fnSin(0)).toBe(0);
      expect(Math.sin).toHaveBeenCalledWith(0);
    });
  });

  describe(`fnSome`, () => {
    test(`finds`, () => expect(fnSome<number>(isSame)([1, 2])(2)).toBe(true));
    test(`finds none`, () => expect(fnSome<number>(isSame)([1, 2])(3)).toBe(false));
    test(`finds none if empty`, () => expect(fnSome<number>(isSame)([])(2)).toBe(false));
  });

  describe(`fnSplit`, () => {
    test(`splits`, () => expect(fnSplit('.')('1.23.456.7890')).toEqual(['1', '23', '456', '7890']));
  });

  describe(`fnSub`, () => {
    test(`subtracts`, () => expect(fnSub(1)(2)).toBe(-1));
  });

  describe(`fnSum`, () => {
    test(`sums`, () => expect(fnSum(1)(2)).toBe(3));
  });

  describe(`fnOr`, () => {
    test(`is true for t||t`, () => expect(fnOr(1)(2)).toBe(true));
    test(`is true for t||f`, () => expect(fnOr(1)(0)).toBe(true));
    test(`is true for f||t`, () => expect(fnOr(0)(1)).toBe(true));
    test(`is false for f||f`, () => expect(fnOr(0)(0)).toBe(false));

    describe(`fnOrs`, () => {
      test(`is true for f,t`, () => expect(fnOrs(0, 1)).toBe(true));
      test(`is false for f,f`, () => expect(fnOrs(0, 0)).toBe(false));
    });
  });

  describe(`fnTail`, () => {
    test(`returns tail for [.]`, () => expect(fnTail([1, 2, 3])).toEqual([2, 3]));
    test(`returns undefined for []`, () => expect(fnTail([])).toEqual([]));
    test(`returns undefined for undefined`, () => expect(fnTail(undefined)).toBe(undefined));
  });

  describe(`fnTrace`, () => {
    test(`logs and returns same`, () => {
      jest.spyOn(console, 'log');
      expect(fnTrace('tag')(1)).toBe(1);
      expect(console.log).toHaveBeenCalledWith('tag: 1');
    });
  });

  describe(`fnWhileDo`, () => {
    test(`loops until break`, () => expect(fnWhileDo((nr) => nr < 4)(plusOne)(0)).toBe(4));
    test(`does not loop on immediate break`, () => expect(fnWhileDo(() => false)(plusOne)(0)).toBe(0));
  });

  describe(`fnWrap`, () => {
    interface WrapTest {
      number: number;
    }

    interface WrapNestedTest {
      nested: WrapTest;
    }

    test(`fnWrap`, () => {
      const wrap = fnWrap((arg: WrapTest) => arg.number)((val) => (obj) => ({...obj, number: val}));
      expect(wrap).toBeTruthy();
      expect(wrap.getter({number: 123})).toBe(123);
      expect(wrap.setter(321)({number: 123})).toEqual({number: 321});
    });

    test(`fnWrapKey`, () => {
      const wrap = fnWrapKey<WrapTest, 'number'>('number');
      expect(wrap).toBeTruthy();
      expect(wrap.getter({number: 123})).toBe(123);
      expect(wrap.setter(321)({number: 123})).toEqual({number: 321});
    });

    test(`fnWrapGet`, () => expect(fnWrapGet({getter: (obj: WrapTest) => obj.number, setter: null})({number: 123})).toBe(123));

    test(`fnWrapSet`, () =>
      expect(
        fnWrapSet({getter: null, setter: (value: number) => (obj: WrapTest) => ({...obj, number: value})})(321)({number: 123}),
      ).toEqual({number: 321}));

    test(`fnWrapIn`, () => {
      const wrapNumber = fnWrapKey<WrapTest, 'number'>('number');
      const wrapNested = fnWrapKey<WrapNestedTest, 'nested'>('nested');
      const wrap = fnWrapIn(wrapNested)(wrapNumber);

      const old: WrapNestedTest = {nested: {number: 123}};
      expect(wrap).toBeTruthy();
      expect(wrap.getter(old)).toBe(123);

      expect(wrap.setter(321)(old)).toEqual({nested: {number: 321}});
      expect(wrap.setter(321)(old)).not.toBe(old);

      expect(wrap.setter(old.nested.number)(old)).toBe(old);
    });
  });
});
