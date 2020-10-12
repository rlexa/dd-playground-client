import {Injectable} from '@angular/core';
import {mergeFlags} from 'src/app/rx-state/state/state-global';
import {RxStateService} from './rx-state.service';

@Injectable({providedIn: 'root'})
export class RxStateSetGlobalService {
  constructor(private readonly rxState: RxStateService) {}

  mergeFlags = this.rxState.act_(mergeFlags);
}
