import { Component } from '@angular/core';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { ReduxService } from 'app/redux';

const userAgent = !window ? '' : window.navigator.userAgent;
const isBrowserChrome = userAgent.indexOf('Chrome') >= 0;
const isBrowserIE = userAgent.indexOf('MSIE') >= 0 || userAgent.match(/Trident.*rv\:11\./);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  readonly isBrowserChrome = isBrowserChrome;
  readonly isBrowserIE = isBrowserIE;

  isForcingStart = false;

  private locale = null;
  private start: () => void = null;

  constructor(
    title: Title,
    dateAdapter: DateAdapter<NativeDateAdapter>,
    router: Router,
    // all below: create-by-injection asap
    redux: ReduxService
  ) {
    this.start = () => {
      title.setTitle(redux.state.globalValues.flags.title);
      dateAdapter.setLocale('de-DE');
      router.events.filter(ev => ev instanceof NavigationEnd).subscribe(ev => redux.setGlobalRoute(router.routerState.snapshot.url));
    };
    if (this.isBrowserChrome) {
      this.start();
    }
  }

  onForceStart() {
    this.isForcingStart = true;
    this.start();
  }

}
