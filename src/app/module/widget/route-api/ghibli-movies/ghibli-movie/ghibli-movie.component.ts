import {ChangeDetectionStrategy, Component, Inject, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {GhibliMovie} from '../../api-ghibli.service';
import {DiRouteMovieId} from '../../di-ghibli-movie';

@Component({
  selector: 'app-ghibli-movie',
  templateUrl: './ghibli-movie.component.html',
  styleUrls: ['./ghibli-movie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhibliMovieComponent {
  constructor(@Inject(DiRouteMovieId) public readonly id$: Observable<string>) {}

  @Input() data: GhibliMovie = null;
}
