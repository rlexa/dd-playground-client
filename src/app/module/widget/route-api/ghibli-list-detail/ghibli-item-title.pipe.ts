import {Inject, Pipe, PipeTransform} from '@angular/core';
import {DiRemoteCurrentItemToTitle} from './di-ghibli-list';

@Pipe({name: 'itemToTitle', pure: true})
export class ItemToTitlePipe<T> implements PipeTransform {
  constructor(@Inject(DiRemoteCurrentItemToTitle) private readonly fnItemToTitle: (item: T) => string) {}

  transform(value: any, ...args: any[]) {
    return this.fnItemToTitle(value);
  }
}
