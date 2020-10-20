import {ChangeDetectorRef, Directive, Inject, OnDestroy, OnInit} from '@angular/core';
import {DoneSubject, RxCleanup} from 'dd-rxjs';
import {Observable} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {GhibliMovie} from '../../api-ghibli.service';
import {DiRouteMovie} from '../../di-ghibli-movie';
import {GhibliMovieComponent} from './ghibli-movie.component';

@Directive({selector: '[ghibliMovieAutowire]'})
export class GhibliMovieAutowireDirective implements OnDestroy, OnInit {
  constructor(
    private readonly ghibliMovieComponent: GhibliMovieComponent,
    @Inject(DiRouteMovie) private readonly data$: Observable<GhibliMovie>,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  @RxCleanup() private readonly done$ = new DoneSubject();

  destroy() {}
  ngOnDestroy() {
    this.destroy();
  }

  ngOnInit() {
    this.data$.pipe(takeUntil(this.done$)).subscribe((data) => {
      this.ghibliMovieComponent.data = data;
      this.changeDetectorRef.markForCheck();
    });
  }
}
