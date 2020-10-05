import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {DateAdapter, NativeDateAdapter} from '@angular/material/core';
import {Title} from '@angular/platform-browser';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {RxStateService, RxStateSetGlobalService} from './rx-state';

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
    title.setTitle(rxState.getState().globalValues.flags.title);
    dateAdapter.setLocale('de-DE');
    router.events
      .pipe(filter((ev) => ev instanceof NavigationEnd))
      .subscribe((ev) => rxStateMutate.setRoute(router.routerState.snapshot.url));
  }

  destroy() {}
  ngOnDestroy() {
    this.destroy();
  }
}
