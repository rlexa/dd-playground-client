import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GhibliSpecies} from '../../api-ghibli.service';
import {DiRemoteCurrentItem} from '../../ghibli-detail';

@Component({
  selector: 'app-routed-ghibli-species-detail',
  templateUrl: './routed-ghibli-species-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutedGhibliSpeciesDetailComponent {
  constructor(@Inject(DiRemoteCurrentItem) public readonly item$: Observable<GhibliSpecies>) {}

  public readonly keyVals$ = this.item$.pipe(
    map((val) => ({
      Classification: val?.classification,
      'Eye Colors': val?.eye_colors,
      'Hair Colors': val?.hair_colors,
    })),
  );
}
