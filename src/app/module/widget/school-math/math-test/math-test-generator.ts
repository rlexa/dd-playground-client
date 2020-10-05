import {fnCompose, fnFloor, fnJoin, fnMap, fnMult, fnSin, fnSome, fnSub, fnSum} from 'src/app/util/fns';

export type MathTestQuestionType = 'pyramide' | 'shortresult' | 'table' | 'questionline';

export interface MathTestQuestion {
  points?: number;
  result?: string;
  text?: string;
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

export function randomize(seed: number) {
  return () => {
    seed = fnMult(10000)(fnSin(seed));
    return fnSub(seed)(fnFloor(seed));
  };
}

const rndInt = (max: number) => (rnd: () => number) => fnCompose(fnFloor, fnSum(0.5), fnMult(max))(rnd());

// GENERATE

const generateTaskDivideWithSomeRest = (rnd: () => number): MathTestTask => {
  return {title: 'TODO Teilen mit und ohne Rest.'};
};

const generateTaskDotBeforeLinePriority = (rnd: () => number): MathTestTask => {
  return {title: 'TODO Denke an die Regel.'};
};

const generateTaskNumberByDescription = (rnd: () => number): MathTestTask => {
  return {title: 'TODO Zahlen rausfinden'};
};

const generateTaskNumberPack = (rnd: () => number): MathTestTask => {
  return {title: 'TODO Päckchen'};
};

const generateTaskInsertComparison = (rnd: () => number): MathTestTask => {
  return {title: 'TODO Setze ein. > < ='};
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
  const isSameTerm = (aa: Term) => (bb: Term) => aa.opSum === bb.opSum && aa.first === bb.first && aa.second === bb.second;
  const points = 4;

  let terms: Term[] = [];
  while (terms.length < points * 2) {
    if (!(terms.length % 2)) {
      const first = fnCompose(fnSum(49), rndInt(50))(rnd);
      const second = fnCompose(fnSum(11), rndInt(first - 11))(rnd);
      const term: Term = {first, second, opSum: false};
      if (!fnSome(isSameTerm)(terms)(term)) {
        terms = [...terms, term];
      }
    } else {
      const first = fnCompose(fnSum(11), rndInt(60))(rnd);
      const second = fnCompose(fnSum(11), rndInt(100 - first - 11))(rnd);
      const term: Term = {first, second, opSum: true};
      if (!fnSome(isSameTerm)(terms)(term)) {
        terms = [...terms, term];
      }
    }
  }

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
  const rndFiveTwenty = fnCompose(fnSum(5), rndInt(20));
  const valZeroZero = rndFiveTwenty(rnd);
  const valZeroTwo = rndFiveTwenty(rnd);
  const valZeroThree = rndFiveTwenty(rnd);

  const rndThreeEight = fnCompose(fnSum(3), rndInt(8));
  const valOneOne = fnSum(valZeroTwo)(rndThreeEight(rnd));

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
  const valSample = fnCompose(fnSum(2), rndInt(7));

  const valsDistinct = (len: number) => (getAnother: (arg: () => number) => number) => (rndGenerator: () => number) => {
    let vals: number[] = [];
    while (vals.length < len) {
      const val = getAnother(rndGenerator);
      if (!vals.includes(val)) {
        vals = [...vals, val];
      }
    }
    return vals;
  };

  const topValCount = 4;
  const topVals = valsDistinct(topValCount)(valSample)(rnd);

  const leftValCount = 4;
  const leftVals = valsDistinct(leftValCount)(valSample)(rnd);

  const errorCount = 5;
  const rndIndex = rndInt(topValCount * leftValCount);
  const errorIndices = valsDistinct(errorCount)(rndIndex)(rnd);

  const rndError = fnCompose(fnSum(2), rndInt(97));
  const rows = leftVals.map((left, leftIndex) =>
    topVals.map((top, topIndex) => {
      const ret = left * top;
      if (errorIndices.includes(leftIndex * topValCount + topIndex)) {
        let retError = ret;
        while (retError === ret) {
          retError = rndError(rnd);
        }
        return retError;
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
  const valBase = fnCompose(fnSum(30), rndInt(30))(rnd);
  const valPlus = fnCompose(fnSum(10), rndInt(10))(rnd);
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
