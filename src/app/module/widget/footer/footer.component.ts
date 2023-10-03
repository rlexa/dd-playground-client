import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {VersionComponent} from '../version';

@Component({
  selector: 'app-footer',
  template: `<span class="filler"></span>
    <ng-content />
    <app-version />`,
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, VersionComponent],
})
export class FooterComponent {}
