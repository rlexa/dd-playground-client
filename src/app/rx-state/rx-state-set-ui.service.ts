import { Injectable } from '@angular/core';
import { merge_dashboard } from 'app/rx-state/state/state-ui';
import { orObject } from 'dd-rx-state';
import { RxStateService } from './rx-state.service';

@Injectable({ providedIn: 'root' })
export class RxStateSetUiService {
  constructor(private readonly rxState: RxStateService) { }

  mergeDashboardState = this.rxState.act_(merge_dashboard, orObject);
}
