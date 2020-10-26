import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GhibliVehicle} from '../../api-ghibli.service';
import {DiRemoteCurrentItem} from '../../ghibli-detail';

@Component({
  selector: 'app-routed-ghibli-vehicle-detail',
  templateUrl: './routed-ghibli-vehicle-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutedGhibliVehicleDetailComponent {
  constructor(@Inject(DiRemoteCurrentItem) public readonly item$: Observable<GhibliVehicle>) {}

  public readonly keyVals$ = this.item$.pipe(
    map((val) => ({
      Description: val?.description,
      'Vehicle Class': val?.vehicle_class,
      Length: val?.length,
    })),
  );
}
