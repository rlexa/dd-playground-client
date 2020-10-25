import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {trackByIndex} from 'src/app/util';
import {GhibliMovie} from '../../api-ghibli.service';

@Component({
  selector: 'app-ghibli-movie-detail',
  templateUrl: './ghibli-movie-detail.component.html',
  styleUrls: ['./ghibli-movie-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhibliMovieDetailComponent {
  public item: GhibliMovie = null;
  public keyVals: {[key: string]: string | number} = null;

  @Input() set movie(val: GhibliMovie) {
    if (val !== this.item) {
      this.item = val;
      this.keyVals = {
        'Release Date': val?.release_date,
        Score: val?.rt_score,
        Description: val?.description,
        Director: val?.director,
        Producer: val?.producer,
      };
    }
  }

  public readonly trackByIndex = trackByIndex;
}
