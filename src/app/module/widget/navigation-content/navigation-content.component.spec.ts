import {ComponentFixture} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {MockBuilder, MockRender} from 'ng-mocks';
import {of} from 'rxjs';
import {Mock} from 'ts-mockery';
import {NavigationContentComponent, NavigationContentComponentData} from './navigation-content.component';

describe('NavigationContentComponent', () => {
  let fixture: ComponentFixture<NavigationContentComponent>;

  beforeEach(() =>
    MockBuilder(NavigationContentComponent).provide({
      provide: ActivatedRoute,
      useValue: Mock.from<ActivatedRoute>({data: of<NavigationContentComponentData>({navigationContentScrollable: true})}),
    }),
  );

  beforeEach(() => {
    fixture = MockRender(NavigationContentComponent);
    fixture.detectChanges();
  });

  it('creates instance', () => expect(fixture.componentInstance).toBeTruthy());

  it(`renders`, () => expect(fixture).toMatchSnapshot());
});
