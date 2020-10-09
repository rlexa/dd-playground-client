import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {Content} from 'pdfmake/interfaces';
import {fnCompose, fnFilter, fnIfThenElse, fnJoin, fnMap, fnMapIndexed, fnPadEnd, fnPadStart, fnSplit, fnSum} from 'src/app/util/fns';
import {MathTest, MathTestQuestion, MathTestQuestionType, MathTestTask} from './math-test-generator';

// needed for some reason (see docs)
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

const indexToChar = fnCompose(String.fromCharCode, fnSum('a'.charCodeAt(0)));
const splitByComma = fnSplit(',');
const splitByWall = fnSplit('|');
const wrapIn = (wrap: string) => (val: unknown) => `${wrap}${val}${wrap}`;
const getText = <V, T extends {text?: V}>(obj: T) => obj?.text;

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
  pyramide: fnCompose(questionPyramideToPdf, getText),
  questionline: fnCompose(questionLineToPdf, getText),
  shortresult: fnCompose(questionShortResultToPdf, getText),
  table: fnCompose(questionTableToPdf, getText),
};

const questionToPdf = (index: number) => (val: MathTestQuestion): Content =>
  fnFilter<Content>(Boolean)([
    fnIfThenElse(Boolean(val?.title))({text: `${indexToChar(index)}) ${val.title}`})(null),
    (typeHandle[val?.type] ?? ((value: MathTestQuestion) => `TODO type ${value?.type || 'undefined'}`))(val),
  ]);

const taskToPdf = (index: number) => (val: MathTestTask): Content => ({
  stack: [
    {text: `${index + 1}. ${val.title ?? ''}`, style: ['h2', 'marginTop']},
    {text: val.text ?? '', style: 'marginAll'},
    ...indexedItemToPdfContentWith(questionToPdf)(val.questions ?? []),
  ],
  unbreakable: true,
});

export const mathTestTaskToPoints = (data: MathTestTask) => data?.questions?.reduce((acc, question) => acc + question.points ?? 0, 0) ?? 0;

const questionToResultsPdf = (data: MathTestQuestion): Content => `Punkte: ${data.points}. Ergebnis: ${data.result}`;

const taskToResultsPdf = (index: number) => (data: MathTestTask): Content => ({
  stack: [{text: `${index + 1}. Punkte: ${mathTestTaskToPoints(data)}`}, ...data?.questions?.map(questionToResultsPdf)],
  style: 'marginAll',
});

export const mathTestToPoints = (data: MathTest) => data?.tasks?.reduce((acc, task) => acc + mathTestTaskToPoints(task), 0) ?? 0;

export function mathTestToPdf(data: MathTest) {
  return !data
    ? null
    : pdfMake.createPdf({
        content: [
          {text: data.title || 'Math Test', style: 'h1'},
          ...indexedItemToPdfContentWith(taskToPdf)(data?.tasks),
          {pageBreak: 'before', text: `Ergebnisse für: ${data.title}`, style: 'h1'},
          {text: `Punkte: ${mathTestToPoints(data)}`},
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
