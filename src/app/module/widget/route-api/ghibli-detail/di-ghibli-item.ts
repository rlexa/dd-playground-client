import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {WithId} from '../api-ghibli.service';

export const DiRemoteCurrentItem = new InjectionToken<Observable<WithId>>('API loaded item.');
