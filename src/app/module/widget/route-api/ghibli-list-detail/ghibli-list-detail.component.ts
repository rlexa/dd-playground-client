import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {Observable} from 'rxjs';
import {WithId} from '../api-ghibli.service';
import {DiRemoteCurrentList} from './di-ghibli-list';

@Component({
  selector: 'app-ghibli-list-detail',
  templateUrl: './ghibli-list-detail.component.html',
  styleUrls: ['./ghibli-list-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhibliListDetailComponent<T extends WithId> {
  constructor(@Inject(DiRemoteCurrentList) public readonly items$: Observable<T[]>) {}

  trackById = (item: WithId) => item.id;
}
