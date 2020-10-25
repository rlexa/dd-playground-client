import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-ghibli-link',
  templateUrl: './ghibli-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhiblLinkComponent {
  @Input() link: string;
}
