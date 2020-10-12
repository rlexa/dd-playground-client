import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {MockComponents} from 'ng-mocks';
import {Subject} from 'rxjs';
import {detectChanges, getterMockedComponent, mockWith, overrideForChangeDetection} from 'src/app/test';
import {Mock} from 'ts-mockery';
import {NavigationBarComponent, NavigationBarItem} from '../navigation-bar';
import {NavigationContentComponent, NavigationContentComponentRouteData} from './navigation-content.component';

describe('NavigationContentComponent', () => {
  let fixture: ComponentFixture<NavigationContentComponent>;

  const navMultiple = [1, 2, 3].map<NavigationBarItem>((ii) => ({
    icon: `icon${ii}`,
    label: `label${ii}`,
    route: `route${ii}`,
  }));

  const navSingle = [navMultiple[0]];

  const data$ = new Subject<NavigationContentComponentRouteData>();

  afterAll(() => data$.complete());

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavigationContentComponent, MockComponents(NavigationBarComponent)],
      providers: [
        mockWith(
          ActivatedRoute,
          Mock.from<ActivatedRoute>({data: data$}),
        ),
      ],
    })
      .overrideComponent(NavigationContentComponent, overrideForChangeDetection)
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationContentComponent);
    detectChanges(fixture);
  });

  it('creates instance', () => expect(fixture.componentInstance).toBeTruthy());
  it(`renders`, () => expect(fixture).toMatchSnapshot());

  [navSingle, navMultiple].forEach((navs) => {
    describe(`with routes=${navs.length}`, () => {
      const hasNavBar = navs.length > 1;

      beforeEach(() => {
        data$.next({navs});
        detectChanges(fixture);
      });

      it(`renders`, () => expect(fixture).toMatchSnapshot());

      it(`does${hasNavBar ? '' : ' not'} show nav bar`, () =>
        expect(!!getterMockedComponent(NavigationBarComponent)(fixture)).toBe(hasNavBar));

      if (hasNavBar) {
        it(`forwards routed items`, () => expect(getterMockedComponent(NavigationBarComponent)(fixture).items).toBe(navMultiple));
      }
    });
  });
});
