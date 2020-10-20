import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {GhibliMovie} from '../../api-ghibli.service';

@Component({
  selector: 'app-ghibli-movie',
  templateUrl: './ghibli-movie.component.html',
  styleUrls: ['./ghibli-movie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhibliMovieComponent {
  @Input() data: GhibliMovie = null;
}
