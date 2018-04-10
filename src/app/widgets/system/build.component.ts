import { Component } from '@angular/core';
import { ReduxService } from 'app/redux';

@Component({ selector: 'app-build', templateUrl: './build.component.html' })
export class BuildComponent {
  constructor(private redux: ReduxService) { }
  data$ = this.redux.watch(state => state.globalValues.flags);
}
