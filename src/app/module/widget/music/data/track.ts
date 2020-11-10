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

const trim = (text: string) => text?.trim();

const splitBreaksWin = (text: string) => text?.split('\r\n');
const splitBreaksMac = (text: string) => text?.split('\r');
const splitBreaksUnix = (text: string) => text?.split('\n');

const normalizeTextLine = (text: string) =>
  text
    ?.replace(/\t/g, '')
    .replace(/(<[^(><.)]+>)/g, '')
    .replace(/<>/g, '');

const getIndent = (text: string) => (text?.startsWith('\t') ? 1 : 0);

const textToLine = (text: string): Line => ({indent: getIndent(text), text: normalizeTextLine(text)});

export const textToLines = (text: string) => splitBreaksWin(trim(text)).flatMap(splitBreaksMac).flatMap(splitBreaksUnix).map(textToLine);
