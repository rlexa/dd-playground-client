import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GhibliLocation} from '../../api-ghibli.service';
import {DiRemoteCurrentItem} from '../../ghibli-detail';

@Component({
  selector: 'app-routed-ghibli-location-detail',
  templateUrl: './routed-ghibli-location-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutedGhibliLocationDetailComponent {
  constructor(@Inject(DiRemoteCurrentItem) public readonly item$: Observable<GhibliLocation>) {}

  public readonly keyVals$ = this.item$.pipe(
    map((val) => ({
      Climate: val?.climate,
      'Surface Water': val?.surface_water,
      Terrain: val?.terrain,
    })),
  );
}
