import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { RxStateService, RxStateSetGlobalService } from 'app/rx-state';
import { RxCleanup } from 'dd-rxjs';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

const userAgent = !window ? '' : window.navigator.userAgent;
const isBrowserChrome = userAgent.indexOf('Chrome') >= 0;
const isBrowserIE = userAgent.indexOf('MSIE') >= 0 || userAgent.match(/Trident.*rv\:11\./);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {
  constructor(
    title: Title,
    dateAdapter: DateAdapter<NativeDateAdapter>,
    router: Router,
    rxState: RxStateService,
    rxStateMutate: RxStateSetGlobalService,
  ) {
    this.start = () => {
      title.setTitle(rxState.state.globalValues.flags.title);
      dateAdapter.setLocale('de-DE');
      router.events.pipe(filter(ev => ev instanceof NavigationEnd)).subscribe(ev => rxStateMutate.setRoute(router.routerState.snapshot.url));
    };
    if (this.isBrowserChrome) {
      this.start();
    }
  }

  private start: () => void = null;

  readonly isBrowserChrome = isBrowserChrome;
  readonly isBrowserIE = isBrowserIE;
  @RxCleanup() readonly isForcingStart$ = new BehaviorSubject(false);

  ngOnDestroy() { }

  onForceStart() {
    this.isForcingStart$.next(true);
    this.start();
  }

}
