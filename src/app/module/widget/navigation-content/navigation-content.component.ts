import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {map} from 'rxjs/operators';
import {NavigationBarItem} from '../navigation-bar';

export interface NavigationContentComponentRouteData extends Data {
  navs: NavigationBarItem[];
}

@Component({
  selector: 'app-navigation-content',
  templateUrl: './navigation-content.component.html',
  styleUrls: ['./navigation-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationContentComponent {
  constructor(private readonly activatedRoute: ActivatedRoute) {}

  readonly navs$ = this.activatedRoute.data.pipe(map((data: NavigationContentComponentRouteData) => data?.navs ?? null));
}
