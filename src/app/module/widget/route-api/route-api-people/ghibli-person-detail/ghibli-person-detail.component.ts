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
  public item: GhibliPerson = null;
  public keyVals: {[key: string]: string | number} = null;

  @Input() set person(val: GhibliPerson) {
    if (val !== this.item) {
      this.item = val;
      this.keyVals = {
        Gender: val?.gender,
        Age: val?.age,
        'Eye Color': val?.eye_color,
        'Hair Color': val?.hair_color,
      };
    }
  }

  public readonly trackByIndex = trackByIndex;
}
