import {fnCompose, fnFloor, fnJoin, fnMap, fnMult, fnSin, fnSub, fnSum} from 'src/app/util/fns';

export type MathTestQuestionType = 'pyramide' | 'questionline';

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

// GENERATE

const generateTaskPyramideSum = (rnd: () => number): MathTestTask => {
  const rndFiveTwenty = fnCompose(fnSum(5), fnFloor, fnMult(20));
  const valZeroZero = rndFiveTwenty(rnd());
  const valZeroTwo = rndFiveTwenty(rnd());
  const valZeroThree = rndFiveTwenty(rnd());

  const rndThreeEight = fnCompose(fnSum(3), fnFloor, fnMult(8));
  const valOneOne = fnSum(valZeroTwo)(rndThreeEight(rnd()));

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
        text:
          '|' +
          joinPyramide(fnMap(joinNumbers)([[null], [null, null], [null, valOneOne, null], [valZeroZero, null, valZeroTwo, valZeroThree]])) +
          '|',
        result: joinPyramide(fnMap(joinNumbers)([lvlThree, lvlTwo, lvlOne, lvlZero])),
        points: 3,
      },
    ],
  };
};

const generateTaskTextSumSketch = (rnd: () => number): MathTestTask => {
  const valBase = fnCompose(fnSum(30), fnFloor, fnMult(30))(rnd());
  const valPlus = fnCompose(fnSum(10), fnFloor, fnMult(10))(rnd());
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
  return {title, tasks: [generateTaskTextSumSketch(rnd), generateTaskPyramideSum(rnd)]};
}
