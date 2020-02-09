import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingBarComponent {
  @HostBinding('style.display') readonly styleDisplay = 'block';
  @HostBinding('style.marginTop') styleMarginTop = '1rem';
  @HostBinding('style.minHeight') readonly styleMinHeight = '.5rem';

  @Input() set withMargin(val: boolean) {
    this.styleMarginTop = !!val ? '1rem' : null;
  }

  @Input() show = false;
}
