import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Environment, train } from '@tensorflow/tfjs';
import { ReduxSetUiAiService } from 'app/redux';
import { RxCleanup, rxFire, rxFire_ } from 'dd-rxjs';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TfjsService implements OnDestroy, OnInit {
  constructor(
    private readonly reduxSet: ReduxSetUiAiService,
  ) {
    this.ngOnInit();
  }

  @RxCleanup() private readonly triggerSync$ = new Subject();

  @RxCleanup() readonly tfOptimizers$ = new BehaviorSubject(Object.keys(train));

  triggerSync = rxFire_(this.triggerSync$);

  ngOnDestroy() { }

  ngOnInit() {
    this.triggerSync$.subscribe(() => {
      this.reduxSet.setTfjsBackend(Environment.getBackend());
      this.reduxSet.setTfjsMemory(Environment.memory());
    });

    rxFire(this.triggerSync$);
  }
}
