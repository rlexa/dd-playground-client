import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { ReduxService, ReduxSetGlobalService } from 'app/redux';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

const userAgent = !window ? '' : window.navigator.userAgent;
const isBrowserChrome = userAgent.indexOf('Chrome') >= 0;
const isBrowserIE = userAgent.indexOf('MSIE') >= 0 || userAgent.match(/Trident.*rv\:11\./);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {
  constructor(
    title: Title,
    dateAdapter: DateAdapter<NativeDateAdapter>,
    router: Router,
    redux: ReduxService,
    reduxSet: ReduxSetGlobalService,
  ) {
    this.start = () => {
      title.setTitle(redux.state.globalValues.flags.title);
      dateAdapter.setLocale('de-DE');
      router.events.pipe(filter(ev => ev instanceof NavigationEnd)).subscribe(ev => reduxSet.setRoute(router.routerState.snapshot.url));
    };
    if (this.isBrowserChrome) {
      this.start();
    }
  }

  private start: () => void = null;

  readonly isBrowserChrome = isBrowserChrome;
  readonly isBrowserIE = isBrowserIE;
  readonly isForcingStart$ = new BehaviorSubject(false);

  ngOnDestroy() {
    this.isForcingStart$.complete();
  }

  onForceStart() {
    this.isForcingStart$.next(true);
    this.start();
  }

}
