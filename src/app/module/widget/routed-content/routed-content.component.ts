import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-routed-content',
  templateUrl: './routed-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutedContentComponent {}
