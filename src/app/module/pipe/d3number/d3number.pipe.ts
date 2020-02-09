import {Pipe, PipeTransform} from '@angular/core';
import {format} from 'd3';

/** https://github.com/d3/d3-format/blob/master/README.md#format */
@Pipe({name: 'd3number', pure: true})
export class D3numberPipe implements PipeTransform {
  readonly formatter = format;

  transform(value: any, argFormat?: any, argStartFrom?: any): any {
    const from = parseInt(argStartFrom || '', 10);
    return argFormat && (isNaN(from) || value >= from) ? this.formatter(argFormat)(value) : value;
  }
}
