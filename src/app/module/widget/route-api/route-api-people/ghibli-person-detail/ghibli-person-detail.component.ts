import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {Observable} from 'rxjs';
import {trackByIndex} from 'src/app/util';
import {GhibliPerson} from '../../api-ghibli.service';
import {DiRemoteCurrentItem} from '../../ghibli-detail';

@Component({
  selector: 'app-ghibli-person-detail',
  templateUrl: './ghibli-person-detail.component.html',
  styleUrls: ['./ghibli-person-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhibliPersonDetailComponent {
  constructor(@Inject(DiRemoteCurrentItem) public readonly item$: Observable<GhibliPerson>) {}

  public readonly trackByIndex = trackByIndex;
}
