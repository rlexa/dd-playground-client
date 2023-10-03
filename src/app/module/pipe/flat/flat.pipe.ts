import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'flat', pure: true, standalone: true})
export class FlatPipe<T> implements PipeTransform {
  transform(value: (T | T[])[]): any {
    return Array.isArray(value) ? value.flat() : [value];
  }
}
