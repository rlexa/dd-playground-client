import { Component } from '@angular/core';
import { ReduxService } from 'app/redux';

@Component({ selector: 'app-demo-state', templateUrl: './demo-state.component.html' })
export class DemoStateComponent {
  constructor(private redux: ReduxService) { }
  state$ = this.redux.watch(state => state);
}
