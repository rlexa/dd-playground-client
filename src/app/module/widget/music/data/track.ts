import {fnCompose, fnPadEnd, fnSplit} from 'src/app/util/fns';

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

export const TRANSPOSITIONS = 12;

export const normalizeTranspose = (transponse: number) => {
  transponse = transponse % TRANSPOSITIONS;
  return transponse >= 0 ? transponse : transponse + TRANSPOSITIONS;
};

const TONES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const transposeChord = (transpose: number) => (chord: string) => {
  transpose = normalizeTranspose(transpose);
  while (chord.length && transpose > 0) {
    const iDown = chord.indexOf('b');
    if (iDown > 0) {
      chord = chord.substr(0, iDown) + chord.substr(iDown + 1);
    } else {
      const iTone = TONES.findIndex((ii) => ii.includes(chord[0]));
      if (iTone >= 0) {
        const iUp = chord.indexOf('#');
        if (iUp > 0) {
          chord = chord.substr(0, iUp) + chord.substr(iUp + 1);
          chord = TONES[(iTone + 1) % TONES.length] + chord.substr(1);
        } else {
          const tone = TONES[iTone];
          if (tone === 'E' || tone === 'B') {
            chord = TONES[(iTone + 1) % TONES.length] + chord.substr(1);
          } else if (tone === 'A') {
            chord = 'Bb' + chord.substr(1);
          } else {
            chord += '#';
          }
        }
      } else {
        chord = `${chord}#`;
      }
    }
    --transpose;
  }
  return chord;
};

const normalizeChord = (chord: string) => chord?.replace(/H/g, 'B');

const adjustChords = (transpose: number) => (text: string) =>
  normalizeChord(text)?.replace(/<(.+?)>/g, (match, chord: string, offset: number, inputString: string) => {
    const chordNew = transposeChord(transpose)(chord);
    return fnPadEnd(' ')(chord.length + 2)(chordNew);
  });

const normalizeTextLine = (transpose: number) => (text: string) =>
  adjustChords(transpose)(text)
    ?.replace(/\t/g, '')
    .replace(/(<[^(><.)]+>)/g, '')
    .replace(/<>/g, '');

const textToLine = (transpose: number) => (text: string): Line => ({indent: getIndent(text), text: normalizeTextLine(transpose)(text)});

export const textToLines = (text: string, transpose: number) =>
  splitBreaksWin(trim(text)).flatMap(splitBreaksMac).flatMap(splitBreaksUnix).map(textToLine(transpose));
