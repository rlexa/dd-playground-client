import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GhibliPerson} from '../../api-ghibli.service';
import {DiRemoteCurrentItem} from '../../ghibli-detail';

@Component({
  selector: 'app-routed-ghibli-person-detail',
  templateUrl: './routed-ghibli-person-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutedGhibliPersonDetailComponent {
  constructor(@Inject(DiRemoteCurrentItem) public readonly item$: Observable<GhibliPerson>) {}

  public readonly keyVals$ = this.item$.pipe(
    map((val) => ({
      Gender: val?.gender,
      Age: val?.age,
      'Eye Color': val?.eye_color,
      'Hair Color': val?.hair_color,
    })),
  );
}
