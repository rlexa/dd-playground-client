import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';

export const DiRemoteCurrentList = new InjectionToken<Observable<any[]>>('API loaded items.');
