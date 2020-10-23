import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {trackByIndex} from 'src/app/util';
import {GhibliPerson} from '../../api-ghibli.service';

@Component({
  selector: 'app-ghibli-person-detail',
  templateUrl: './ghibli-person-detail.component.html',
  styleUrls: ['./ghibli-person-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhibliPersonDetailComponent {
  @Input() item: GhibliPerson;
  public readonly trackByIndex = trackByIndex;
}
