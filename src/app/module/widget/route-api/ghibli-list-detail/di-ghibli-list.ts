import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {WithId} from '../api-ghibli.service';

export const DiRemoteCurrentList = new InjectionToken<Observable<WithId[]>>('API loaded items.');

export type FnItemToTitle = <T extends WithId>(item: T) => string;
export const DiRemoteCurrentItemToTitle = new InjectionToken<FnItemToTitle>('Item -> Title getter.');
