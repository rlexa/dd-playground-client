import {
  fnAbs,
  fnCompose,
  fnFloor,
  fnGt,
  fnGte,
  fnJoin,
  fnLen,
  fnMap,
  fnMult,
  fnSame,
  fnSin,
  fnSome,
  fnSub,
  fnSum,
  fnWhileDo,
} from 'src/app/util/fns';

export type MathTestQuestionType = 'pyramide' | 'shortresult' | 'table' | 'questionline';

export interface MathTestQuestion {
  points?: number;
  result?: string;
  text?: string;
  title?: string;
  type?: MathTestQuestionType;
}

export interface MathTestTask {
  text?: string;
  title?: string;
  questions?: MathTestQuestion[];
}

export interface MathTest {
  tasks?: MathTestTask[];
  title?: string;
}

// UTIL

const joinText = fnJoin(' ');

const fnJsonEqual = <T>(aa: T) => (bb: T) => JSON.stringify(aa) === JSON.stringify(bb);

export function randomize(seed: number) {
  return () => {
    seed = fnMult(10000)(fnSin(seed));
    return fnSub(seed)(fnFloor(seed));
  };
}

const rndInt = (max: number) => (rnd: () => number) => fnCompose(fnFloor, fnSum(0.5), fnMult(max))(rnd());
const rndIntBetween = (min: number) => (max: number) => fnCompose(fnSum(min), rndInt(fnSub(max)(min)));

const needMoreItems = <T>(want: number) => fnCompose<boolean, T[], number>(fnGt(want), fnLen);

const addDistinctItemsUntil = <T>(newItem: (items: T[]) => T) => (compare: (aa: T) => (bb: T) => boolean) => (want: number) => (
  init: T[],
) =>
  fnWhileDo(needMoreItems<T>(want))((items) => {
    const item = newItem(items);
    return fnSome(compare)(items)(item) ? items : [...items, item];
  })(init);

// GENERATE

const generateQuestionDivideWithSomeRest = (rnd: () => number): MathTestQuestion => {
  const left = rndIntBetween(15)(100)(rnd);
  const right = rndIntBetween(2)(9)(rnd);
  const rest = left % right;

  return {
    type: 'shortresult',
    text: `${left} : ${right} = __`,
    result: `${fnFloor(left / right)}${rest ? 'R' + rest : ''}`,
    points: 0.5,
  };
};

const generateTaskDivideWithSomeRest = (rnd: () => number): MathTestTask => {
  const questions = addDistinctItemsUntil(() => generateQuestionDivideWithSomeRest(rnd))(fnJsonEqual)(10)([]);
  const joinWithComma = fnJoin(',');
  return {
    title: 'Teilen mit und ohne Rest.',
    questions: [
      questions.reduce<MathTestQuestion>(
        (acc, ii) => ({
          ...acc,
          text: acc.text ? joinWithComma([acc.text, ii.text]) : ii.text,
          result: acc.result ? joinWithComma([acc.result, ii.result]) : ii.result,
          points: acc.points + ii.points,
        }),
        {type: 'shortresult', text: '', result: '', points: 0},
      ),
    ],
  };
};

const generateQuestionDotBeforeLinePriority = (rnd: () => number): MathTestQuestion => {
  const rndBoolean = fnCompose(fnGte(50), rndInt(100));
  const isMult = rndBoolean(rnd);
  const isSum = rndBoolean(rnd);
  const isDotFirst = rndBoolean(rnd);

  const right = rndIntBetween(2)(9)(rnd);
  const left = isMult ? rndIntBetween(2)(9)(rnd) : fnMult(right)(rndIntBetween(2)(9)(rnd));
  const dotResult = isMult ? left * right : left / right;
  const last = isSum ? rndIntBetween(5)(30)(rnd) : isDotFirst ? rndIntBetween(0)(dotResult)(rnd) : rndIntBetween(dotResult)(100)(rnd);
  const result = isSum ? dotResult + last : isDotFirst ? dotResult - last : last - dotResult;

  const textDot = `${left} ${isMult ? '*' : ':'} ${right}`;

  return {
    type: 'shortresult',
    text: `${isDotFirst ? textDot : last} ${isSum ? '+' : '-'} ${isDotFirst ? last : textDot} = __`,
    result: `${result}`,
    points: 0.5,
  };
};

const generateTaskDotBeforeLinePriority = (rnd: () => number): MathTestTask => {
  const questions = addDistinctItemsUntil(() => generateQuestionDotBeforeLinePriority(rnd))(fnJsonEqual)(6)([]);
  const joinWithComma = fnJoin(',');
  return {
    title: 'Denke an die Regel.',
    questions: [
      questions.reduce<MathTestQuestion>(
        (acc, ii) => ({
          ...acc,
          text: acc.text ? joinWithComma([acc.text, ii.text]) : ii.text,
          result: acc.result ? joinWithComma([acc.result, ii.result]) : ii.result,
          points: acc.points + ii.points,
        }),
        {type: 'shortresult', text: '', result: '', points: 0},
      ),
    ],
  };
};

const generateQuestionNumberByDescription = (rnd: () => number): MathTestQuestion => {
  const base = rndIntBetween(5)(9)(rnd);
  const mult = rndIntBetween(3)(9)(rnd);
  const result = fnMult(base)(mult);

  const deviation = rndInt(base - 1);
  const left = fnCompose(fnSub(result), deviation)(rnd);
  const right = fnCompose(fnSum(result), deviation)(rnd);

  return {
    type: 'questionline',
    text: `Meine Zahl ist ${result % 2 ? 'ungerade' : 'gerade'}. Sie ist eine ${base}-Zahl. Sie liegt zwischen ${left} und ${right}.`,
    result: String(result),
    points: 1,
  };
};

const generateTaskNumberByDescription = (rnd: () => number): MathTestTask => {
  return {
    text: 'Wie heißen die Zahlen?',
    questions: addDistinctItemsUntil(() => generateQuestionNumberByDescription(rnd))(fnJsonEqual)(2)([]),
  };
};

const generateTaskNumberPack = (rnd: () => number): MathTestTask => {
  const leftDelta = rndIntBetween(3)(7)(rnd);

  const rightDelta = fnWhileDo<number>(fnSame(leftDelta))(() => rndIntBetween(2)(5)(rnd))(leftDelta);
  const first = rndIntBetween(60)(99)(rnd);
  const second = rndIntBetween(10)(40)(rnd);

  interface Term {
    first: number;
    second: number;
  }
  const terms = [0, 0, 0, 0, 0].map<Term>((_, index) => ({first: first + index * leftDelta, second: second + index * rightDelta}));

  return {
    questions: [
      ...terms.map<MathTestQuestion>((term, index) => ({
        type: 'shortresult',
        text: `${index < 3 ? term.first : '__'} - ${index < 3 ? term.second : '__'} = __`,
        title: !index ? 'Setze fort und rechne.' : undefined,
        result: `${term.first} - ${term.second} = ${term.first - term.second}`,
        points: 1,
      })),
      {
        type: 'questionline',
        title: 'Beschreibe das Päckchen.',
        text: 'Die erste Zahl',
        result: `wird um ${leftDelta} erhöht`,
        points: 1,
      },
      {
        type: 'questionline',
        text: 'Die zweite Zahl',
        result: `wird um ${rightDelta} erhöht`,
        points: 1,
      },
      {
        type: 'questionline',
        text: 'Deshalb',
        result: `wird das Ergebnis um ${fnAbs(leftDelta - rightDelta)} ${leftDelta > rightDelta ? 'erhöht' : 'erniedrigt'}`,
        points: 1,
      },
    ],
  };
};

const generateQuestionInsertComparison = (rnd: () => number): MathTestQuestion => {
  const left1 = rndInt(9)(rnd);
  const left2 = rndInt(9)(rnd);
  const right1 = rndInt(9)(rnd);
  const right2 = rndInt(9)(rnd);

  const left = fnMult(left1)(left2);
  const right = fnMult(right1)(right2);

  return {
    type: 'shortresult',
    text: `${left1} * ${left2} __ ${right1} * ${right2}`,
    result: `${left === right ? '=' : left > right ? '>' : '<'}`,
    points: 0.5,
  };
};

const generateTaskInsertComparison = (rnd: () => number): MathTestTask => {
  const questions = addDistinctItemsUntil(() => generateQuestionInsertComparison(rnd))(fnJsonEqual)(4)([]);
  const joinWithComma = fnJoin(',');
  return {
    title: 'Setze ein. > < =',
    questions: [
      questions.reduce<MathTestQuestion>(
        (acc, ii) => ({
          ...acc,
          text: acc.text ? joinWithComma([acc.text, ii.text]) : ii.text,
          result: acc.result ? joinWithComma([acc.result, ii.result]) : ii.result,
          points: acc.points + ii.points,
        }),
        {type: 'shortresult', text: '', result: '', points: 0},
      ),
    ],
  };
};

const generateTaskInsertOperation = (rnd: () => number): MathTestTask => {
  return {title: 'TODO Setze ein. + - * :'};
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
  })(fnJsonEqual)(termCount)([]);

  return {
    questions: [
      {
        type: 'shortresult',
        text: terms.map((term) => `${term.first} ${term.opSum ? '+' : '-'} ${term.second} = __`).join(','),
        result: terms.map((term) => (term.opSum ? term.first + term.second : term.first - term.second)).join(','),
        points,
      },
    ],
  };
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
  const joinNumbers = fnJoin(',');

  return {
    questions: [
      {
        type: 'pyramide',
        text: joinPyramide(
          fnMap(joinNumbers)([[null], [null, null], [null, valOneOne, null], [valZeroZero, null, valZeroTwo, valZeroThree]]),
        ),
        result: joinPyramide(fnMap(joinNumbers)([lvlThree, lvlTwo, lvlOne, lvlZero])),
        points: 3,
      },
    ],
  };
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
  const joinVals = fnJoin(',');
  const asText = fnCompose(joinLines, fnMap<(string | number)[], string>(joinVals));

  return {
    text: joinText([`In der Rechentafel sind ${errorCount} Fehler.`, `Streiche die falschen Ergebnisse durch.`]),
    questions: [
      {
        type: 'table',
        text: asText([['*', ...topVals], ...rows.map((row, index) => [leftVals[index], ...row])]),
        result: joinVals(errorIndices.map((index) => rows[Math.floor(index / topValCount)][index % topValCount])),
        points: 4,
      },
    ],
  };
};

const generateTaskTextSumSketch = (rnd: () => number): MathTestTask => {
  const valBase = rndIntBetween(30)(60)(rnd);
  const valPlus = rndIntBetween(10)(20)(rnd);
  const valResult = fnSum(valBase)(valPlus);

  return {
    text: joinText([
      `Zeichne eine Skizze.`,
      `Rechne und antworte.`,
      `Jule schwimmt ${valBase}m weit.`,
      `Max schafft ${valPlus}m mehr als Jule.`,
      `Wie weit schwimmt Max?`,
    ]),
    questions: [
      {type: 'questionline', text: 'Rechnung:', result: `${valBase}m + ${valPlus}m = ${valResult}m`, points: 1},
      {type: 'questionline', text: 'Antwort:', result: `Max schwimmt ${valResult}m weit.`, points: 1},
    ],
  };
};

export function generateMathTestGrade2({seed = 1, title = 'Math Test'}): MathTest {
  const rnd = randomize(seed);
  return {
    title,
    tasks: [
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
    ],
  };
}
