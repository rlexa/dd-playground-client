import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'flat', pure: true})
export class FlatPipe<T> implements PipeTransform {
  transform(value: (T | T[])[], args?: any): any {
    return Array.isArray(value) ? value.flat() : [value];
  }
}
