import {Inject, Pipe, PipeTransform} from '@angular/core';
import {DiRemoteCurrentItemToId, DiRemoteCurrentItemToTitle} from '../di-api-common';

@Pipe({name: 'itemToId', pure: true})
export class ItemToIdPipe<T> implements PipeTransform {
  constructor(@Inject(DiRemoteCurrentItemToId) private readonly fnItemToTitle: (item: T) => string) {}

  transform(value: any, ...args: any[]) {
    return this.fnItemToTitle(value);
  }
}

@Pipe({name: 'itemToTitle', pure: true})
export class ItemToTitlePipe<T> implements PipeTransform {
  constructor(@Inject(DiRemoteCurrentItemToTitle) private readonly fnItemToTitle: (item: T) => string) {}

  transform(value: any, ...args: any[]) {
    return this.fnItemToTitle(value);
  }
}
