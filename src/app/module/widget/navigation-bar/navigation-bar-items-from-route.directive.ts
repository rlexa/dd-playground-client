import {Directive, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {DoneSubject, RxCleanup} from 'dd-rxjs';
import {filter, map, takeUntil} from 'rxjs/operators';
import {NavigationBarComponent, NavigationBarItem} from './navigation-bar.component';

export interface NavigationBarItemsData extends Data {
  navigationBarItems: NavigationBarItem[];
}

@Directive({selector: '[appNavigationBarItemsFromRoute]'})
export class NavigationBarItemsFromRouteDirective implements OnDestroy, OnInit {
  constructor(private readonly activatedRoute: ActivatedRoute, private readonly navigationBarComponent: NavigationBarComponent) {}

  @RxCleanup() private readonly done$ = new DoneSubject();

  destroy() {}
  ngOnDestroy() {
    this.destroy();
  }

  ngOnInit() {
    this.activatedRoute.data
      .pipe(
        filter(() => !!this.navigationBarComponent),
        map((data: NavigationBarItemsData) => data?.navigationBarItems ?? null),
        takeUntil(this.done$),
      )
      .subscribe((items) => (this.navigationBarComponent.items = items));
  }
}
