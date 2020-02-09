import {Injectable} from '@angular/core';
import {mergeDashboard} from 'app/rx-state/state/state-ui';
import {orObject} from 'dd-rx-state';
import {RxStateService} from './rx-state.service';

@Injectable({providedIn: 'root'})
export class RxStateSetUiService {
  constructor(private readonly rxState: RxStateService) {}

  mergeDashboardState = this.rxState.act_(mergeDashboard, orObject);
}
