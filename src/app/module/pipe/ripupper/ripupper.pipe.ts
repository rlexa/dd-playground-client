import {Pipe, PipeTransform} from '@angular/core';

export const isUpperCase = (value: string, index: number) => !!/[A-ZÀ-ÖØ-ÞΆΈ-ΏΑ-ΫϢϤϦϨϪϬϮϴϷϹϺϽ-Ͽ]/.exec(value[index]);
const hasBreaks = (value: string, from: number, to: number) => {
  for (let ii = from; ii < to; ++ii) {
    if (!!/[ _]/.exec(value[ii])) {
      return true;
    }
  }
  return false;
};

@Pipe({name: 'ripupper', pure: true, standalone: true})
export class RipupperPipe implements PipeTransform {
  transform(value: string): string {
    if (typeof value === 'string' && value.length >= 3) {
      const iis: number[] = [0];
      for (let ii = 2; ii < value.length - 1; ++ii) {
        if (isUpperCase(value, ii) && !isUpperCase(value, ii - 1)) {
          iis.push(ii);
        }
      }
      if (iis.length >= 2) {
        for (let jj = iis.length - 2; jj >= 0; --jj) {
          if (iis[jj + 1] - iis[jj] >= 2 && !hasBreaks(value, iis[jj], iis[jj + 1])) {
            value = value.substr(0, iis[jj + 1]) + ' ' + value.substr(iis[jj + 1]);
          }
        }
      }
    }
    return value;
  }
}
