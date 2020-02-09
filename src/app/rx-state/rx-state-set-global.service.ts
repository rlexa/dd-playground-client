import {Injectable} from '@angular/core';
import {mergeFlags, setRoute} from 'app/rx-state/state/state-global';
import {or_} from 'dd-rx-state';
import {RxStateService} from './rx-state.service';

@Injectable({providedIn: 'root'})
export class RxStateSetGlobalService {
  constructor(private readonly rxState: RxStateService) {}

  mergeFlags = this.rxState.act_(mergeFlags);
  setRoute = this.rxState.act_(setRoute, or_(''));
}
