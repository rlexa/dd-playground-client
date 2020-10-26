import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-ghibli-item-detail',
  templateUrl: './ghibli-item-detail.component.html',
  styleUrls: ['./ghibli-item-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhibliItemDetailComponent {
  @Input() keyVals: {[key: string]: any};
  @Input() links: string[];
  @Input() linkSelf: string;
  @Input() title: string;
}
