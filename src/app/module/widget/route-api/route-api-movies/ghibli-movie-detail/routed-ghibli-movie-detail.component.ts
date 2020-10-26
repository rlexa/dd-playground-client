import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GhibliMovie} from '../../api-ghibli.service';
import {DiRemoteCurrentItem} from '../../ghibli-detail';

@Component({
  selector: 'app-routed-ghibli-movie-detail',
  templateUrl: './routed-ghibli-movie-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutedGhibliMovieDetailComponent {
  constructor(@Inject(DiRemoteCurrentItem) public readonly item$: Observable<GhibliMovie>) {}

  public readonly keyVals$ = this.item$.pipe(
    map((val) => ({
      'Release Date': val?.release_date,
      Score: val?.rt_score,
      Description: val?.description,
      Director: val?.director,
      Producer: val?.producer,
    })),
  );
}
