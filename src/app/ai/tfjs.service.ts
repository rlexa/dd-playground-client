import { Injectable } from '@angular/core';
import { Environment } from '@tensorflow/tfjs';
import { ReduxSetUiAiService } from 'app/redux';

@Injectable({ providedIn: 'root' })
export class TfjsService {
  constructor(private readonly reduxSet: ReduxSetUiAiService) {
    this.syncCurrentState();
  }

  syncCurrentState = () => {
    this.reduxSet.setTfjsBackend(Environment.getBackend());
    this.reduxSet.setTfjsMemory(Environment.memory());
  }
}
