import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-routed-ghibli-movie',
  templateUrl: './routed-ghibli-movie.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutedGhibliMovieComponent {}
