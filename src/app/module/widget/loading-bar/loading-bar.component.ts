import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-loading-bar',
  template: `@if (show) {
    <mat-progress-bar mode="indeterminate" />
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
})
export class LoadingBarComponent {
  @HostBinding('style.display') readonly styleDisplay = 'block';
  @HostBinding('style.marginTop') styleMarginTop = '1rem';
  @HostBinding('style.minHeight') readonly styleMinHeight = '.5rem';

  @Input() set withMargin(val: boolean) {
    this.styleMarginTop = !!val ? '1rem' : null;
  }

  @Input() show?: boolean | null;
}
