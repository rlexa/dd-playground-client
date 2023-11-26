import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {Content} from 'pdfmake/interfaces';
import {
  fnChecked,
  fnCheckThenOrNull,
  fnCompose,
  fnFilter,
  fnIs,
  fnJoin,
  fnMap,
  fnMapIndexed,
  fnPadEnd,
  fnPadStart,
  fnSplit,
  fnSum,
} from 'src/app/util/fns';
import {
  getPoints,
  getQuestions,
  getResult,
  getTasks,
  getText,
  getTitle,
  getType,
  MathTest,
  MathTestQuestion,
  MathTestQuestionType,
  MathTestTask,
} from './math-test-generator';

// needed for some reason (see docs)
const wth = pdfMake as any;
(wth as any).vfs = pdfFonts.pdfMake.vfs;

const indexToChar = fnCompose(String.fromCharCode, fnSum('a'.charCodeAt(0)));
const splitByComma = fnSplit(',');
const splitByWall = fnSplit('|');
const wrapIn = (wrap: string) => (val: unknown) => `${wrap}${val}${wrap}`;
const filterValidContent = fnFilter<Content>(Boolean);

const indexedItemToPdfContentWith = <T>(mapIndexed: (index: number) => (val: T) => Content) =>
  fnCompose(filterValidContent, fnMapIndexed(mapIndexed));

const questionLineToPdf = (val: string): Content => ({text: `${val} _____`, style: 'marginAll'});

function questionShortResultToPdf(val: string): Content {
  const terms = splitByComma(val);
  const termToPdf = (text: string): Content => ({text, style: {lineHeight: 1.2}});
  return {
    columns: [terms.slice(0, Math.ceil(terms.length / 2)).map(termToPdf), terms.slice(Math.ceil(terms.length / 2)).map(termToPdf)],
    style: 'marginAll',
  };
}

function questionTableToPdf(val: string): Content {
  const rows = splitByWall(val);
  const stringToContent = (text: string): Content => ({text, style: {margin: 1}});
  const rowToContents = fnCompose(fnMap(stringToContent), splitByComma);
  return {
    table: {
      headerRows: 1,
      widths: fnMap(() => 'auto')(rows),
      body: fnMap(rowToContents)(rows),
    },
    style: 'marginAll',
  };
}

function questionPyramideToPdf(val: string): Content {
  const wrapWithWall = wrapIn('|');
  const joinWithWall = fnJoin('|');
  const prepareValue = fnCompose(fnPadEnd(' ')(6), fnPadStart(' ')(5), (ii: string) => ii ?? '');
  const linesVals = fnCompose(fnMap(splitByComma), splitByWall)(val);
  return {
    stack: linesVals.map<Content>((vals) => ({
      text: fnCompose(wrapWithWall, joinWithWall)(fnMap(prepareValue)(vals)),
      alignment: 'center',
      style: {lineHeight: 1.2, fontSize: 16},
    })),
    style: 'marginAll',
  };
}

const typeHandle: Record<MathTestQuestionType, (val: MathTestQuestion) => Content> = {
  pyramide: fnCompose(questionPyramideToPdf, getText),
  questionline: fnCompose(questionLineToPdf, getText),
  shortresult: fnCompose(questionShortResultToPdf, getText),
  table: fnCompose(questionTableToPdf, getText),
};

const hasTitle = fnCompose(fnIs, getTitle);

const questionTitleToPdf = (index: number) =>
  fnCheckThenOrNull(hasTitle)((val: MathTestQuestion): Content => ({text: `${indexToChar(index)}) ${getTitle(val)}`}));

const questionToPdf =
  (index: number) =>
  (val: MathTestQuestion): Content =>
    filterValidContent([
      questionTitleToPdf(index)(val),
      (typeHandle[getType(val)] ?? ((value: MathTestQuestion) => `TODO type ${getType(value) || 'undefined'}`))(val),
    ]);

const taskToPdf =
  (index: number) =>
  (val: MathTestTask): Content => ({
    stack: [
      {text: `${index + 1}. ${getTitle(val) ?? ''}`, style: ['h2', 'marginTop']},
      {text: getText(val) ?? '', style: 'marginAll'},
      ...indexedItemToPdfContentWith(questionToPdf)(getQuestions(val) ?? []),
    ],
    unbreakable: true,
  });

const questionToResultsPdf = (data: MathTestQuestion): Content => `Punkte: ${getPoints(data)}. Ergebnis: ${getResult(data)}`;

const taskToResultsPdf =
  (index: number) =>
  (data: MathTestTask): Content => ({
    stack: [{text: `${index + 1}. Punkte: ${getPoints(data)}`}, ...getQuestions(data)?.map(questionToResultsPdf)],
    style: 'marginAll',
  });

const testToPdf = (data: MathTest) =>
  pdfMake.createPdf({
    content: [
      {text: getTitle(data) || 'Math Test', style: 'h1'},
      ...indexedItemToPdfContentWith(taskToPdf)(getTasks(data)),
      {pageBreak: 'before', text: `Ergebnisse für: ${getTitle(data)}`, style: 'h1'},
      {text: `Punkte: ${getPoints(data)}`},
      ...indexedItemToPdfContentWith(taskToResultsPdf)(getTasks(data)),
    ],
    styles: {
      defaultStyle: {fontSize: 14},
      h1: {fontSize: 16, bold: true, alignment: 'center', lineHeight: 1.2},
      h2: {fontSize: 15, bold: true, lineHeight: 1.1},
      marginAll: {margin: 5},
      marginTop: {margin: [0, 10, 0, 0]},
    },
  });

export const mathTestToPdf = fnChecked(testToPdf);
