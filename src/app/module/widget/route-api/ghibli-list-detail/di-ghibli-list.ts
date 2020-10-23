import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {WithId} from '../api-ghibli.service';

export const DiRemoteCurrentList = new InjectionToken<Observable<WithId[]>>('API loaded items.');
