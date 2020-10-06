import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {Content} from 'pdfmake/interfaces';
import {fnCompose, fnJoin, fnMap, fnPadEnd, fnPadStart, fnSplit} from 'src/app/util/fns';
import {MathTest, MathTestQuestion, MathTestTask} from './math-test-generator';

// needed for some reason (see docs)
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

const splitByComma = fnSplit(',');
const splitByWall = fnSplit('|');
const wrapIn = (wrap: string) => (val: unknown) => `${wrap}${val}${wrap}`;

function questionLineToPdf(val: string): Content {
  return {text: `${val} _____`, style: 'marginAll'};
}

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

function questionToPdf(val: MathTestQuestion, index: number): Content {
  return [
    val?.title ? {text: `${String.fromCharCode('a'.charCodeAt(0) + index)}) ${val.title}`} : null,
    val?.type === 'pyramide'
      ? questionPyramideToPdf(val.text)
      : val?.type === 'shortresult'
      ? questionShortResultToPdf(val.text)
      : val?.type === 'table'
      ? questionTableToPdf(val.text)
      : val?.type === 'questionline'
      ? questionLineToPdf(val.text)
      : `TODO type ${val?.type || 'undefined'}`,
  ].filter((ii) => !!ii);
}

function taskToPdf(val: MathTestTask, index: number): Content {
  return {
    stack: [
      {text: `${index + 1}. ${val.title ?? ''}`, style: ['h2', 'marginTop']},
      {text: val.text ?? '', style: 'marginAll'},
      ...(val.questions || []).map((ii, iindex) => questionToPdf(ii, iindex)).filter((ii) => !!ii),
    ],
    unbreakable: true,
  };
}

export const mathTestTaskToPoints = (data: MathTestTask) =>
  data?.questions?.reduce((acc2, question) => acc2 + question.points ?? 0, 0) ?? 0;

function questionToResultsPdf(data: MathTestQuestion): Content {
  return `Punkte: ${data.points}. Ergebnis: ${data.result}`;
}

function taskToResultsPdf(data: MathTestTask, index: number): Content {
  return {
    stack: [{text: `${index + 1}. Punkte: ${mathTestTaskToPoints(data)}`}, ...data?.questions?.map(questionToResultsPdf)],
    style: 'marginAll',
  };
}

export const mathTestToPoints = (data: MathTest) => data?.tasks?.reduce((acc, task) => acc + mathTestTaskToPoints(task), 0) ?? 0;

export function mathTestToPdf(data: MathTest) {
  return !data
    ? null
    : pdfMake.createPdf({
        content: [
          {text: data.title || 'Math Test', style: 'h1'},
          ...data?.tasks?.map((ii, index) => taskToPdf(ii, index)).filter((ii) => !!ii),
          {pageBreak: 'before', text: `Ergebnisse für: ${data.title}`, style: 'h1'},
          {text: `Punkte: ${mathTestToPoints(data)}`},
          ...data?.tasks?.map((ii, index) => taskToResultsPdf(ii, index)).filter((ii) => !!ii),
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
