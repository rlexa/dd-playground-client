import {ChangeDetectorRef, Directive, OnDestroy, OnInit, inject} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {DoneSubject, RxCleanup} from 'dd-rxjs';
import {filter, map, takeUntil} from 'rxjs/operators';
import {NavigationBarComponent, NavigationBarItem} from './navigation-bar.component';

export interface NavigationBarItemsData extends Data {
  navigationBarItems: NavigationBarItem[];
}

@Directive({selector: '[appNavigationBarItemsFromRoute]', standalone: true})
export class NavigationBarItemsFromRouteDirective implements OnDestroy, OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly navigationBarComponent = inject(NavigationBarComponent);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

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
      .subscribe((items) => {
        this.navigationBarComponent.items = items;
        this.changeDetectorRef.markForCheck();
      });
  }
}
