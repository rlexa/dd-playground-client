import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-empty',
  template: '<div>...</div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyComponent {}
