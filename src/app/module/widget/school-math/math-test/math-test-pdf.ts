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
  return val?.type === 'pyramide' ? questionPyramideToPdf(val.text) : val?.type === 'questionline' ? questionLineToPdf(val.text) : null;
}

function taskToPdf(val: MathTestTask, index: number): Content {
  return [
    {text: `${index + 1} ${val.title ?? ''}`, style: ['h2', 'marginTop']},
    {text: val.text ?? '', style: 'marginAll'},
    ...val?.questions?.map(questionToPdf).filter((ii) => !!ii),
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
