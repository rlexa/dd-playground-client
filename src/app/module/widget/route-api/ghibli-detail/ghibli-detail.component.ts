import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {Observable} from 'rxjs';
import {DiRemoteCurrentItem} from './di-ghibli-item';

@Component({
  selector: 'app-ghibli-detail',
  templateUrl: './ghibli-detail.component.html',
  styleUrls: ['./ghibli-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhibliDetailComponent<T> {
  constructor(@Inject(DiRemoteCurrentItem) public readonly item$: Observable<T>) {}
}
