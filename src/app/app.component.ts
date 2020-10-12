import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DateAdapter, NativeDateAdapter} from '@angular/material/core';
import {Title} from '@angular/platform-browser';
import {RxStateService} from './rx-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(title: Title, dateAdapter: DateAdapter<NativeDateAdapter>, rxState: RxStateService) {
    title.setTitle(rxState.getState().globalValues.flags.title);
    dateAdapter.setLocale('de-DE');
  }
}
