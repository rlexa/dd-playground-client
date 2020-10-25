import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {trackByIndex} from 'src/app/util';

@Component({
  selector: 'app-ghibli-link',
  templateUrl: './ghibli-link.component.html',
  styleUrls: ['./ghibli-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhiblLinkComponent {
  @Input() links: string[];
  trackByIndex = trackByIndex;
}
