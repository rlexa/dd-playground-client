import {fnCompose, fnPadStart, fnSplit} from 'src/app/util/fns';

export interface Meta {
  key: string;
  value: string;
}

export interface Track {
  meta?: Meta[];
  text?: string;
}

export const TRACK_META_TITLE = 'title';

export interface Line {
  indent?: number;
  text?: string;
}

const lineBreaks = ['\r\n', '\r', '\n'];

const splitBreaksWin = fnSplit(lineBreaks[0]);
const splitBreaksMac = fnSplit(lineBreaks[1]);
const splitBreaksUnix = fnSplit(lineBreaks[2]);

const trimStart = (text: string) =>
  lineBreaks.reduce((acc, lineBreak) => (acc?.startsWith(lineBreak) ? acc.substr(lineBreak.length) : acc), text);
const trimEnd = (text: string) =>
  lineBreaks.reduce((acc, lineBreak) => (acc?.endsWith(lineBreak) ? acc.substr(0, acc.length - lineBreak.length) : acc), text);
const trim = fnCompose(trimEnd, trimStart);

const getIndent = (text: string) => (text?.startsWith('\t') ? 1 : 0);

const adjustChords = (text: string) =>
  text?.replace(/<(.+?)>/g, (match, chord: string, offset: number, inputString: string) => {
    return `${chord}  `;
  });

const normalizeTextLine = (text: string) =>
  adjustChords(text)
    ?.replace(/\t/g, '')
    .replace(/(<[^(><.)]+>)/g, '')
    .replace(/<>/g, '');

const textToLine = (text: string): Line => ({indent: getIndent(text), text: normalizeTextLine(text)});

export const textToLines = (text: string) => splitBreaksWin(trim(text)).flatMap(splitBreaksMac).flatMap(splitBreaksUnix).map(textToLine);
