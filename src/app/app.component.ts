import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject} from '@angular/core';
import {DateAdapter, NativeDateAdapter} from '@angular/material/core';
import {Title} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {DoneSubject, RxCleanup} from 'dd-rxjs';
import {takeUntil} from 'rxjs/operators';
import {DiGlobalTitle} from './di-global';

@Component({
  selector: 'app-root',
  template: `<div class="position-absolute match-parent app-viewport">
    <div class="position-absolute match-parent container-bg-logo"></div>
    <router-outlet />
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterModule],
})
export class AppComponent implements OnDestroy, OnInit {
  private readonly dateAdapter = inject(DateAdapter<NativeDateAdapter>);
  private readonly title = inject(Title);
  private readonly title$ = inject(DiGlobalTitle);

  @RxCleanup() private readonly done$ = new DoneSubject();

  destroy() {}
  ngOnDestroy() {
    this.destroy();
  }

  ngOnInit() {
    this.dateAdapter.setLocale('de-DE');
    this.title$.pipe(takeUntil(this.done$)).subscribe((ii) => this.title.setTitle(ii));
  }
}
