import {
  fnAbs,
  fnApply2,
  fnCompose,
  fnDefault,
  fnDiv,
  fnEqual,
  fnFlip,
  fnFloor,
  fnGenerateOther,
  fnGetter,
  fnGt,
  fnGte,
  fnIfThenElse,
  fnJoin,
  fnLen,
  fnLift1,
  fnLift2to2,
  fnMap,
  fnMapIndexed,
  fnMod,
  fnMult,
  fnProcessApply,
  fnReduce,
  fnSame,
  fnSetter,
  fnSin,
  fnSome,
  fnSub,
  fnSum,
  fnThenElseIf,
  fnWhileDo,
} from 'src/app/util/fns';

export type MathTestQuestionType = 'pyramide' | 'shortresult' | 'table' | 'questionline';

export const getPointsNumber = fnGetter<{points?: number}, 'points'>('points');
export const getTextString = fnGetter<{text?: string}, 'text'>('text');
export const getTitleString = fnGetter<{title?: string}, 'title'>('title');

const getPointsOrZero = fnCompose(fnDefault(0), getPointsNumber);
const accPoints = fnFlip(fnProcessApply(fnSum)(getPointsOrZero));
const sumPoints = fnReduce(0)(accPoints);

export interface WithResultString {
  result?: string;
}

const getResult = fnGetter<WithResultString, 'result'>('result');

export interface WithTextString {
  text?: string;
}

export interface MathTestQuestion extends WithResultString, WithTextString {
  points?: number;
  title?: string;
  type?: MathTestQuestionType;
}

const setQuestionPoints = fnSetter<MathTestQuestion, 'points'>('points');
const setQuestionResult = fnSetter<MathTestQuestion, 'result'>('result');
const setQuestionText = fnSetter<MathTestQuestion, 'text'>('text');
const setQuestionTitle = fnSetter<MathTestQuestion, 'title'>('title');
const setQuestionType = fnSetter<MathTestQuestion, 'type'>('type');

export interface WithMathTestQuestionList {
  questions?: MathTestQuestion[];
}

const getQuestions = fnGetter<WithMathTestQuestionList, 'questions'>('questions');

export interface MathTestTask extends WithMathTestQuestionList, WithTextString {
  points?: number;
  title?: string;
}

const setTaskPoints = fnSetter<MathTestTask, 'points'>('points');
const setTaskQuestions = fnSetter<MathTestTask, 'questions'>('questions');
const setTaskText = fnSetter<MathTestTask, 'text'>('text');
const setTaskTitle = fnSetter<MathTestTask, 'title'>('title');

const calcPointsFromQuestions = fnCompose(sumPoints, getQuestions);
const insertTaskPoints = fnLift1(setTaskPoints)(calcPointsFromQuestions);
const setTaskQuestionsCalcPoints = (questions: MathTestQuestion[]) => fnCompose(insertTaskPoints, setTaskQuestions(questions));

export interface MathTest {
  points?: number;
  tasks?: MathTestTask[];
  title?: string;
}

const setTestPoints = fnSetter<MathTest, 'points'>('points');
const setTestTasks = fnSetter<MathTest, 'tasks'>('tasks');
const setTestTitle = fnSetter<MathTest, 'title'>('title');

// UTIL

const joinText = fnJoin(' ');
const joinComma = fnJoin(',');

const appendString = (joinWith: string) => (current: string) => (append: string) =>
  fnIfThenElse(Boolean(current))(fnJoin(joinWith)([current, append]))(append);

export function randomize(seed: number) {
  return () => {
    seed = fnMult(10000)(fnSin(seed));
    return fnSub(seed)(fnFloor(seed));
  };
}

const increment = fnSum(1);
const rndIntBetween = (min: number) => (max: number) => (rnd: () => number) =>
  fnCompose(fnFloor, fnSum(min), fnMult(fnSub(increment(max))(min)))(rnd());
const rndInt = rndIntBetween(0);
const rndBoolean = fnCompose(fnGte(50), rndInt(100));

const needMoreItems = <T>(want: number) => fnCompose<boolean, T[], number>(fnGt(want), fnLen);

const addDistinctItemsUntil = <T>(newItem: (items: T[]) => T) => (compare: (aa: T) => (bb: T) => boolean) => (want: number) => (
  init: T[],
) =>
  fnWhileDo(needMoreItems<T>(want))((items) => {
    const item = newItem(items);
    return fnSome(compare)(items)(item) ? items : [...items, item];
  })(init);

const mergeQuestionsToQuestionShortresult = fnReduce(fnCompose(setQuestionPoints(0), setQuestionType('shortresult'))(null))(
  (acc) => (ii: MathTestQuestion) => {
    const mergePoints = fnLift2to2(fnSum)(getPointsNumber)(getPointsNumber);
    const mergeResult = fnLift2to2(appendString(','))(getResult)(getResult);
    const mergeText = fnLift2to2(appendString(','))(getTextString)(getTextString);

    return fnCompose(
      setQuestionPoints(mergePoints(acc)(ii)),
      setQuestionResult(mergeResult(acc)(ii)),
      setQuestionText(mergeText(acc)(ii)),
    )(acc);
  },
);

// GENERATE

const generateQuestionDivideWithSomeRest = (rnd: () => number): MathTestQuestion => {
  const result = rndIntBetween(2)(9)(rnd);
  const right = rndIntBetween(2)(9)(rnd);
  const rest = rndIntBetween(0)(right - 1)(rnd);
  const left = fnCompose(fnSum(rest), fnMult(right))(result);

  return fnCompose(
    setQuestionPoints(0.5),
    setQuestionResult(`${result}${rest ? 'R' + rest : ''}`),
    setQuestionText(`${left} : ${right} = __`),
    setQuestionType('shortresult'),
  )(null);
};

const generateTaskDivideWithSomeRest = (rnd: () => number): MathTestTask => {
  const questions = addDistinctItemsUntil(() => generateQuestionDivideWithSomeRest(rnd))(fnEqual)(10)([]);
  return fnCompose(
    setTaskTitle('Teilen mit und ohne Rest.'),
    setTaskQuestionsCalcPoints([mergeQuestionsToQuestionShortresult(questions)]),
  )(null);
};

const generateQuestionDotBeforeLinePriority = (rnd: () => number): MathTestQuestion => {
  const isMult = rndBoolean(rnd);
  const isSum = rndBoolean(rnd);
  const isDotFirst = rndBoolean(rnd);

  const rnd2to9 = rndIntBetween(2)(9);
  const rnd5to30 = rndIntBetween(5)(30);
  const right = rnd2to9(rnd);
  const left = fnIfThenElse(isMult)(rnd2to9)(fnCompose(fnMult(right), rnd2to9))(rnd);

  const dotParamsApply = fnApply2(left)(right);
  const dotOperation = fnIfThenElse(isMult)(fnMult)(fnDiv);
  const dotResult = dotParamsApply(dotOperation);

  const last = isSum ? rnd5to30(rnd) : isDotFirst ? rndIntBetween(0)(dotResult)(rnd) : rndIntBetween(dotResult)(100)(rnd);
  const result = isSum ? fnSum(dotResult)(last) : isDotFirst ? fnSub(dotResult)(last) : fnSub(last)(dotResult);

  const dotSign = fnThenElseIf('*')(':');
  const lineSign = fnThenElseIf('+')('-');

  const textDot = `${left} ${dotSign(isMult)} ${right}`;

  return fnCompose(
    setQuestionPoints(0.5),
    setQuestionResult(`${result}`),
    setQuestionText(`${fnIfThenElse(isDotFirst)(textDot)(last)} ${lineSign(isSum)} ${fnIfThenElse(isDotFirst)(last)(textDot)} = __`),
    setQuestionType('shortresult'),
  )(null);
};

const generateTaskDotBeforeLinePriority = (rnd: () => number): MathTestTask => {
  const questions = addDistinctItemsUntil(() => generateQuestionDotBeforeLinePriority(rnd))(fnEqual)(6)([]);
  return fnCompose(setTaskTitle('Denke an die Regel.'), setTaskQuestionsCalcPoints([mergeQuestionsToQuestionShortresult(questions)]))(null);
};

const generateQuestionNumberByDescription = (rnd: () => number): MathTestQuestion => {
  const base = rndIntBetween(5)(9)(rnd);
  const mult = rndIntBetween(3)(9)(rnd);
  const result = fnMult(base)(mult);

  const deviation = rndInt(base - 1);
  const left = fnCompose(fnSub(result), deviation)(rnd);
  const right = fnCompose(fnSum(result), deviation)(rnd);

  return fnCompose(
    setQuestionPoints(1),
    setQuestionResult(`${result}`),
    setQuestionText(
      joinText([
        `Meine Zahl ist ${result % 2 ? 'ungerade' : 'gerade'}.`,
        `Sie ist eine ${base}-Zahl.`,
        `Sie liegt zwischen ${left} und ${right}.`,
      ]),
    ),
    setQuestionType('questionline'),
  )(null);
};

const generateTaskNumberByDescription = (rnd: () => number): MathTestTask => {
  const questions = addDistinctItemsUntil(() => generateQuestionNumberByDescription(rnd))(fnEqual)(2)([]);
  return fnCompose(setTaskTitle('Wie heißen die Zahlen?'), setTaskQuestionsCalcPoints(questions))(null);
};

const generateTaskNumberPack = (rnd: () => number): MathTestTask => {
  const leftDelta = rndIntBetween(3)(7)(rnd);

  const rnd2to5 = rndIntBetween(2)(5);
  const rightDelta = fnGenerateOther(() => rnd2to5(rnd))(leftDelta);

  const first = rndIntBetween(60)(99)(rnd);
  const second = rndIntBetween(10)(40)(rnd);

  interface Term {
    first: number;
    second: number;
  }
  const indexToFirst = fnCompose(fnSum(first), fnMult(leftDelta));
  const indexToSecond = fnCompose(fnSum(second), fnMult(rightDelta));
  const terms = fnMapIndexed((index) => (): Term => ({first: indexToFirst(index), second: indexToSecond(index)}))([0, 0, 0, 0, 0]);

  const questionLineBase = fnCompose(setQuestionPoints(0.5), setQuestionType('questionline'))(null);
  const indexedTermToQuestion = (index: number) => (term: Term) =>
    fnCompose(
      setQuestionPoints(index < 3 ? 0.5 : 1.5),
      setQuestionResult(`${term.first} - ${term.second} = ${term.first - term.second}`),
      setQuestionText(`${index < 3 ? term.first : '__'} - ${index < 3 ? term.second : '__'} = __`),
      setQuestionTitle(!index ? 'Setze fort und rechne.' : undefined),
      setQuestionType('shortresult'),
    )(null);

  return setTaskQuestionsCalcPoints([
    ...fnMapIndexed(indexedTermToQuestion)(terms),
    fnCompose(
      setQuestionResult(`wird um ${leftDelta} erhöht`),
      setQuestionText('Die erste Zahl'),
      setQuestionTitle('Beschreibe das Päckchen.'),
    )(questionLineBase),
    fnCompose(setQuestionResult(`wird um ${rightDelta} erhöht`), setQuestionText('Die zweite Zahl'))(questionLineBase),
    fnCompose(
      setQuestionResult(`wird das Ergebnis um ${fnAbs(leftDelta - rightDelta)} ${leftDelta > rightDelta ? 'erhöht' : 'erniedrigt'}`),
      setQuestionText('Deshalb'),
    )(questionLineBase),
  ])(null);
};

const generateQuestionInsertComparison = (rnd: () => number): MathTestQuestion => {
  const rnd0to9 = rndInt(9);
  const left1 = rnd0to9(rnd);
  const left2 = rnd0to9(rnd);
  const right1 = rnd0to9(rnd);
  const right2 = rnd0to9(rnd);

  const left = fnMult(left1)(left2);
  const right = fnMult(right1)(right2);

  const resultGreaterOrLess = fnIfThenElse(fnGt(left)(right))('>')('<');
  const resultEqualElse = fnIfThenElse(fnSame(left)(right))('=');
  const result = resultEqualElse(resultGreaterOrLess);

  return fnCompose(
    setQuestionPoints(0.5),
    setQuestionResult(result),
    setQuestionText(`${left1} * ${left2} __ ${right1} * ${right2}`),
    setQuestionType('shortresult'),
  )(null);
};

const generateTaskInsertComparison = (rnd: () => number): MathTestTask => {
  const questions = addDistinctItemsUntil(() => generateQuestionInsertComparison(rnd))(fnEqual)(4)([]);
  return fnCompose(setTaskTitle('Setze ein. > < ='), setTaskQuestionsCalcPoints([mergeQuestionsToQuestionShortresult(questions)]))(null);
};

const generateQuestionInsertOperation = (rnd: () => number): MathTestQuestion => {
  const isMult = rndBoolean(rnd);

  const dot1 = rndIntBetween(2)(9)(rnd);
  const dot2 = rndIntBetween(2)(9)(rnd);
  const dotResult = fnMult(dot1)(dot2);

  const result = isMult ? dotResult : dot2;

  const isSum = rndBoolean(rnd);
  const other1 = isSum ? rndIntBetween(0)(result)(rnd) : result + rndIntBetween(1)(30)(rnd);
  const other2 = isSum ? fnSub(result)(other1) : fnSub(other1)(result);

  const dotText = `${isMult ? dot1 : dotResult} __ ${isMult ? dot2 : dot1}`;
  const sumText = `${other1} __ ${other2}`;

  return fnCompose(
    setQuestionPoints(0.5),
    setQuestionResult(`${isMult ? '*' : ':'} ${isSum ? '+' : '-'}`),
    setQuestionText(`${dotText} = ${sumText}`),
    setQuestionType('shortresult'),
  )(null);
};

const generateTaskInsertOperation = (rnd: () => number): MathTestTask => {
  const questions = addDistinctItemsUntil(() => generateQuestionInsertOperation(rnd))(fnEqual)(4)([]);
  return fnCompose(setTaskTitle(' Setze ein. + - * :'), setTaskQuestionsCalcPoints([mergeQuestionsToQuestionShortresult(questions)]))(null);
};

const generateTaskPlusMinus = (rnd: () => number): MathTestTask => {
  interface Term {
    first: number;
    second: number;
    opSum: boolean;
  }

  const points = 4;
  const termCount = fnMult(2)(points);

  const terms = addDistinctItemsUntil((items: Term[]) => {
    let term: Term = null;
    if (!(items.length % 2)) {
      const first = rndIntBetween(49)(99)(rnd);
      const second = rndIntBetween(11)(first)(rnd);
      term = {first, second, opSum: false};
    } else {
      const first = rndIntBetween(11)(71)(rnd);
      const second = rndIntBetween(11)(100 - first)(rnd);
      term = {first, second, opSum: true};
    }
    return term;
  })(fnEqual)(termCount)([]);

  const termsToText = fnCompose(
    joinComma,
    fnMap((term: Term) => `${term.first} ${term.opSum ? '+' : '-'} ${term.second} = __`),
  );

  const termsToResult = fnCompose(
    joinComma,
    fnMap((term: Term) => (term.opSum ? term.first + term.second : term.first - term.second)),
  );

  return setTaskQuestionsCalcPoints([
    fnCompose(
      setQuestionPoints(points),
      setQuestionResult(termsToResult(terms)),
      setQuestionText(termsToText(terms)),
      setQuestionType('shortresult'),
    )(null),
  ])(null);
};

const generateTaskPyramideSum = (rnd: () => number): MathTestTask => {
  const rnd5to25 = rndIntBetween(5)(25);
  const valZeroZero = rnd5to25(rnd);
  const valZeroTwo = rnd5to25(rnd);
  const valZeroThree = rnd5to25(rnd);

  const rnd3to11 = rndIntBetween(3)(11);
  const valOneOne = fnSum(valZeroTwo)(rnd3to11(rnd));

  const lvlZero = [valZeroZero, fnSub(valOneOne)(valZeroTwo), valZeroTwo, valZeroThree];
  const lvlOne = [fnSum(lvlZero[0])(lvlZero[1]), fnSum(lvlZero[1])(lvlZero[2]), fnSum(lvlZero[2])(lvlZero[3])];
  const lvlTwo = [fnSum(lvlOne[0])(lvlOne[1]), fnSum(lvlOne[1])(lvlOne[2])];
  const lvlThree = [fnSum(lvlTwo[0])(lvlTwo[1])];

  const joinPyramide = fnJoin('|');

  return fnCompose(
    setTaskTitle('Summenpyramide (+).'),
    setTaskQuestionsCalcPoints([
      fnCompose(
        setQuestionPoints(3),
        setQuestionResult(joinPyramide(fnMap(joinComma)([lvlThree, lvlTwo, lvlOne, lvlZero]))),
        setQuestionText(
          joinPyramide(fnMap(joinComma)([[null], [null, null], [null, valOneOne, null], [valZeroZero, null, valZeroTwo, valZeroThree]])),
        ),
        setQuestionType('pyramide'),
      )(null),
    ]),
  )(null);
};

const generateTaskTableMulErrors = (rnd: () => number): MathTestTask => {
  const rnd2to9 = rndIntBetween(2)(9);

  const topValCount = 4;
  const topVals = addDistinctItemsUntil(() => rnd2to9(rnd))(fnSame)(topValCount)([]);

  const leftValCount = 4;
  const leftVals = addDistinctItemsUntil(() => rnd2to9(rnd))(fnSame)(leftValCount)([]);

  const errorCount = 5;
  const rndIndex = rndInt(topValCount * leftValCount - 1);
  const errorIndices = addDistinctItemsUntil(() => rndIndex(rnd))(fnSame)(errorCount)([]);

  const rnd2to99 = rndIntBetween(2)(99);
  const rows = leftVals.map((left, leftIndex) =>
    topVals.map((top, topIndex) => {
      const ret = left * top;
      if (errorIndices.includes(leftIndex * topValCount + topIndex)) {
        return fnWhileDo(fnSame(ret))(() => rnd2to99(rnd))(ret);
      }
      return ret;
    }),
  );

  const joinLines = fnJoin('|');
  const asText = fnCompose(joinLines, fnMap<(string | number)[], string>(joinComma));

  return fnCompose(
    setTaskTitle(joinText([`In der Rechentafel sind ${errorCount} Fehler.`, `Streiche die falschen Ergebnisse durch.`])),
    setTaskQuestionsCalcPoints([
      fnCompose(
        setQuestionPoints(4),
        setQuestionResult(joinComma(errorIndices.map((index) => rows[fnFloor(fnDiv(index)(topValCount))][fnMod(index)(topValCount)]))),
        setQuestionText(asText([['*', ...topVals], ...rows.map((row, index) => [leftVals[index], ...row])])),
        setQuestionType('table'),
      )(null),
    ]),
  )(null);
};

const generateTaskTextSumSketch = (rnd: () => number): MathTestTask => {
  const valBase = rndIntBetween(30)(60)(rnd);
  const valPlus = rndIntBetween(10)(20)(rnd);
  const valResult = fnSum(valBase)(valPlus);

  const questionBase = fnCompose(setQuestionPoints(1), setQuestionTitle(null), setQuestionType('questionline'))(null);

  const question1 = fnCompose(setQuestionText('Rechnung:'), setQuestionResult(`${valBase}m + ${valPlus}m = ${valResult}m`))(questionBase);
  const question2 = fnCompose(setQuestionText('Antwort:'), setQuestionResult(`Max schwimmt ${valResult}m weit.`))(questionBase);

  return fnCompose(
    setTaskTitle(null),
    setTaskText(
      joinText([
        `Zeichne eine Skizze.`,
        `Rechne und antworte.`,
        `Jule schwimmt ${valBase}m weit.`,
        `Max schafft ${valPlus}m mehr als Jule.`,
        `Wie weit schwimmt Max?`,
      ]),
    ),
    setTaskQuestionsCalcPoints([question1, question2]),
  )(null);
};

export function generateMathTestGrade3({seed = 1, title = 'Math Test'}): MathTest {
  const rnd = randomize(seed);
  const tasks = [
    generateTaskTextSumSketch(rnd),
    generateTaskPyramideSum(rnd),
    generateTaskPlusMinus(rnd),
    generateTaskTableMulErrors(rnd),
    generateTaskNumberPack(rnd),
    generateTaskNumberByDescription(rnd),
    generateTaskDivideWithSomeRest(rnd),
    generateTaskDotBeforeLinePriority(rnd),
    generateTaskInsertComparison(rnd),
    generateTaskInsertOperation(rnd),
  ];
  return fnCompose(setTestPoints(sumPoints(tasks)), setTestTasks(tasks), setTestTitle(title))(null);
}
