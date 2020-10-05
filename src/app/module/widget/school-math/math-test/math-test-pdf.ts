import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {Content} from 'pdfmake/interfaces';
import {fnCompose, fnJoin, fnMap, fnPadEnd, fnPadStart} from 'src/app/util/fns';
import {MathTest, MathTestQuestion, MathTestTask} from './math-test-generator';

// needed for some reason (see docs)
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

const wrapIn = (wrap: string) => (val: unknown) => `${wrap}${val}${wrap}`;

function questionLineToPdf(val: string): Content {
  return {text: `${val} ________________________________________`, style: 'marginAll'};
}

function questionShortResultToPdf(val: string): Content {
  const terms = val.split(',');
  const termToPdf = (text: string): Content => ({text, style: {lineHeight: 1.2, fontSize: 15}});
  return {
    columns: [terms.slice(0, Math.ceil(terms.length / 2)).map(termToPdf), terms.slice(Math.ceil(terms.length / 2)).map(termToPdf)],
    style: 'marginAll',
  };
}

function questionTableToPdf(val: string): Content {
  const rows = val.split('|');
  return {
    table: {
      headerRows: 1,
      widths: rows.map(() => 'auto'),
      body: rows.map((row) =>
        row.split(',').map<Content>((text) => ({text, style: {margin: 1, fontSize: 16}})),
      ),
    },
    style: 'marginAll',
  };
}

function questionPyramideToPdf(val: string): Content {
  const wrap = wrapIn('|');
  const joinVals = fnJoin('|');
  const prepareValue = fnCompose(fnPadEnd(' ')(6), fnPadStart(' ')(5), (ii: string) => ii ?? '');
  const linesVals = val.split('|').map((line) => line.split(','));
  return {
    stack: linesVals.map<Content>((vals) => ({
      text: fnCompose(wrap, joinVals)(fnMap(prepareValue)(vals)),
      alignment: 'center',
      style: {lineHeight: 1.2, fontSize: 16},
    })),
    style: 'marginAll',
  };
}

function questionToPdf(val: MathTestQuestion): Content {
  return val?.type === 'pyramide'
    ? questionPyramideToPdf(val.text)
    : val?.type === 'shortresult'
    ? questionShortResultToPdf(val.text)
    : val?.type === 'table'
    ? questionTableToPdf(val.text)
    : val?.type === 'questionline'
    ? questionLineToPdf(val.text)
    : `TODO type ${val?.type || 'undefined'}`;
}

function taskToPdf(val: MathTestTask, index: number): Content {
  return [
    {text: `${index + 1} ${val.title ?? ''}`, style: ['h2', 'marginTop']},
    {text: val.text ?? '', style: 'marginAll'},
    ...(val.questions || []).map(questionToPdf).filter((ii) => !!ii),
  ];
}

export function mathTestToPdf(data: MathTest) {
  return !data
    ? null
    : pdfMake.createPdf({
        content: [
          {text: data.title || 'Math Test', style: 'h1'},
          ...data?.tasks?.map((ii, index) => taskToPdf(ii, index)).filter((ii) => !!ii),
        ],
        styles: {
          defaultStyle: {fontSize: 14},
          h1: {fontSize: 18, bold: true, alignment: 'center', lineHeight: 1.2},
          h2: {fontSize: 16, bold: true, lineHeight: 1.1},
          marginAll: {margin: 5},
          marginTop: {margin: [0, 10, 0, 0]},
        },
      });
}
