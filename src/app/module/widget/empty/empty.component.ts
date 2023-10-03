import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-empty',
  template: '<div>...</div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class EmptyComponent {}
