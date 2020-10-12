import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {MockComponents} from 'ng-mocks';
import {Subject} from 'rxjs';
import {detectChanges, getterMockedComponent, mockWith, overrideForChangeDetection} from 'src/app/test';
import {Mock} from 'ts-mockery';
import {FooterComponent} from '../footer';
import {NavigationBarComponent, NavigationBarItem} from '../navigation-bar';
import {DashboardComponent, DashboardComponentRouteData} from './dashboard.component';

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;

  const navs = [1, 2, 3].map<NavigationBarItem>((ii) => ({
    icon: `icon${ii}`,
    label: `label${ii}`,
    route: `route${ii}`,
  }));

  const data$ = new Subject<DashboardComponentRouteData>();

  afterAll(() => data$.complete());

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DashboardComponent, MockComponents(NavigationBarComponent, FooterComponent)],
      providers: [
        mockWith(
          ActivatedRoute,
          Mock.from<ActivatedRoute>({data: data$}),
        ),
      ],
    })
      .overrideComponent(DashboardComponent, overrideForChangeDetection)
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    detectChanges(fixture);
  });

  it('creates instance', () => expect(fixture.componentInstance).toBeTruthy());
  it(`renders`, () => expect(fixture).toMatchSnapshot());

  describe(`with routes=${navs.length}`, () => {
    beforeEach(() => {
      data$.next({navs});
      detectChanges(fixture);
    });

    it(`renders`, () => expect(fixture).toMatchSnapshot());

    it(`does show nav bar`, () => expect(!!getterMockedComponent(NavigationBarComponent)(fixture)).toBe(true));
    it(`forwards routed items`, () => expect(getterMockedComponent(NavigationBarComponent)(fixture).items).toBe(navs));
  });
});
