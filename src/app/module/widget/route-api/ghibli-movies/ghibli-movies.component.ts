import {ChangeDetectionStrategy, Component, Inject, OnDestroy} from '@angular/core';
import {DoneSubject, RxCleanup} from 'dd-rxjs';
import {Observable} from 'rxjs';
import {GhibliMovie} from '../api-ghibli.service';
import {DiRemoteGhibliMovies} from '../di-ghibli-movie';

@Component({
  selector: 'app-ghibli-movies',
  templateUrl: './ghibli-movies.component.html',
  styleUrls: ['./ghibli-movies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhibliMoviesComponent implements OnDestroy {
  constructor(@Inject(DiRemoteGhibliMovies) public readonly data$: Observable<GhibliMovie[]>) {}

  @RxCleanup() private readonly done$ = new DoneSubject();

  trackById = (item: GhibliMovie) => item.id;

  destroy() {}
  ngOnDestroy() {
    this.destroy();
  }
}
