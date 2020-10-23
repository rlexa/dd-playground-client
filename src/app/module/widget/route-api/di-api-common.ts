import {InjectionToken} from '@angular/core';

export type FnItemToValue<T, V> = (item: T) => V;

export const DiRemoteCurrentItemToId = new InjectionToken<FnItemToValue<any, string>>('Item -> Id');
export const DiRemoteCurrentItemToTitle = new InjectionToken<FnItemToValue<any, string>>('Item -> Title');
