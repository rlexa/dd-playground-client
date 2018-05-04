import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigComponent { }
