import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {Content} from 'pdfmake/interfaces';
import {fnCompose, fnFilter, fnIfThenElse, fnJoin, fnMap, fnMapIndexed, fnPadEnd, fnPadStart, fnSplit, fnSum} from 'src/app/util/fns';
import {
  getPointsNumber,
  getTextString,
  getTitleString,
  MathTest,
  MathTestQuestion,
  MathTestQuestionType,
  MathTestTask,
} from './math-test-generator';

// needed for some reason (see docs)
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

const indexToChar = fnCompose(String.fromCharCode, fnSum('a'.charCodeAt(0)));
const splitByComma = fnSplit(',');
const splitByWall = fnSplit('|');
const wrapIn = (wrap: string) => (val: unknown) => `${wrap}${val}${wrap}`;

const indexedItemToPdfContentWith = <T>(mapIndexed: (index: number) => (val: T) => Content) =>
  fnCompose(fnFilter<Content>(Boolean), fnMapIndexed(mapIndexed));

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
  pyramide: fnCompose(questionPyramideToPdf, getTextString),
  questionline: fnCompose(questionLineToPdf, getTextString),
  shortresult: fnCompose(questionShortResultToPdf, getTextString),
  table: fnCompose(questionTableToPdf, getTextString),
};

const questionToPdf = (index: number) => (val: MathTestQuestion): Content =>
  fnFilter<Content>(Boolean)([
    fnIfThenElse(Boolean(getTitleString(val)))({text: `${indexToChar(index)}) ${getTitleString(val)}`})(null),
    (typeHandle[val?.type] ?? ((value: MathTestQuestion) => `TODO type ${value?.type || 'undefined'}`))(val),
  ]);

const taskToPdf = (index: number) => (val: MathTestTask): Content => ({
  stack: [
    {text: `${index + 1}. ${getTitleString(val) ?? ''}`, style: ['h2', 'marginTop']},
    {text: getTextString(val) ?? '', style: 'marginAll'},
    ...indexedItemToPdfContentWith(questionToPdf)(val.questions ?? []),
  ],
  unbreakable: true,
});

const questionToResultsPdf = (data: MathTestQuestion): Content => `Punkte: ${getPointsNumber(data)}. Ergebnis: ${data.result}`;

const taskToResultsPdf = (index: number) => (data: MathTestTask): Content => ({
  stack: [{text: `${index + 1}. Punkte: ${getPointsNumber(data)}`}, ...data?.questions?.map(questionToResultsPdf)],
  style: 'marginAll',
});

export function mathTestToPdf(data: MathTest) {
  return !data
    ? null
    : pdfMake.createPdf({
        content: [
          {text: getTitleString(data) || 'Math Test', style: 'h1'},
          ...indexedItemToPdfContentWith(taskToPdf)(data?.tasks),
          {pageBreak: 'before', text: `Ergebnisse für: ${getTitleString(data)}`, style: 'h1'},
          {text: `Punkte: ${getPointsNumber(data)}`},
          ...indexedItemToPdfContentWith(taskToResultsPdf)(data?.tasks),
        ],
        styles: {
          defaultStyle: {fontSize: 14},
          h1: {fontSize: 16, bold: true, alignment: 'center', lineHeight: 1.2},
          h2: {fontSize: 15, bold: true, lineHeight: 1.1},
          marginAll: {margin: 5},
          marginTop: {margin: [0, 10, 0, 0]},
        },
      });
}
