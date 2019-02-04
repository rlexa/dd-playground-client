import { Injectable } from '@angular/core';
import { merge_flags, set_route } from 'app/rx-state/state/state-global';
import { or_ } from 'dd-rx-state';
import { RxStateService } from './rx-state.service';

@Injectable({ providedIn: 'root' })
export class RxStateSetGlobalService {
  constructor(private readonly rxState: RxStateService) { }

  mergeFlags = this.rxState.act_(merge_flags);
  setRoute = this.rxState.act_(set_route, or_(''));
}
