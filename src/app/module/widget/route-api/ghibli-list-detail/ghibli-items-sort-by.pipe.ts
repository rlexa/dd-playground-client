import {Inject, Pipe, PipeTransform} from '@angular/core';
import {DiRemoteCurrentItemToTitle} from './di-ghibli-list';

@Pipe({name: 'itemsSortBy', pure: true})
export class ItemsSortByPipe<T> implements PipeTransform {
  constructor(@Inject(DiRemoteCurrentItemToTitle) private readonly fnItemToTitle: (item: T) => string) {}

  private getValue = (item: any, field: string | number) => String(field && item ? item?.[field] : this.fnItemToTitle(item));

  transform(value: any, field: string | number, ...args: any[]) {
    return !Array.isArray(value) ? value : (value as []).sort((aa, bb) => this.getValue(aa, field).localeCompare(this.getValue(bb, field)));
  }
}
