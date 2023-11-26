import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-ghibli-link',
  templateUrl: './ghibli-link.component.html',
  styleUrls: ['./ghibli-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhiblLinkComponent {
  @Input() links: string[];
}
