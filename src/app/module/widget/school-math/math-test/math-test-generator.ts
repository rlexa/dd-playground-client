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

  const topValCount = 4;
  let topVals: number[] = [];
  while (topVals.length < topValCount) {
    const val = valSample(rnd);
    if (!topVals.includes(val)) {
      topVals = [...topVals, val];
    }
  }

  const leftValCount = 4;
  let leftVals: number[] = [];
  while (leftVals.length < leftValCount) {
    const val = valSample(rnd);
    if (!leftVals.includes(val)) {
      leftVals = [...leftVals, val];
    }
  }

  const errorCount = 5;
  const rndIndex = rndInt(topValCount * leftValCount);
  let errorIndices: number[] = [];
  while (errorIndices.length < errorCount) {
    const val = rndIndex(rnd);
    if (!errorIndices.includes(val)) {
      errorIndices = [...errorIndices, val];
    }
  }

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
    tasks: [generateTaskTextSumSketch(rnd), generateTaskPyramideSum(rnd), generateTaskPlusMinus(rnd), generateTaskTableMulErrors(rnd)],
  };
}
