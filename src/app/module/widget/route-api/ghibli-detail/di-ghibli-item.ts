import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';

export const DiRemoteCurrentItem = new InjectionToken<Observable<any>>('API loaded item.');
