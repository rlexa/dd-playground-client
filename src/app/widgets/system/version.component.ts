import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReduxService } from 'app/redux';
import * as routing from 'app/routing';

@Component({ selector: 'app-version', templateUrl: 'version.component.html' })
export class VersionComponent {

  constructor(private redux: ReduxService, private router: Router) { }

  version$ = this.redux.watch(state => state.globalValues.flags.version);

  onGotoSettings = () => routing.gotoSettings(this.router);
}
