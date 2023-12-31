import {ComponentFixture} from '@angular/core/testing';
import {MockBuilder, MockRender} from 'ng-mocks';
import {BehaviorSubject} from 'rxjs';
import {findDirective} from 'src/app/test';
import {FooterComponent} from '../footer';
import {DashboardComponent} from './dashboard.component';
import {DiDashboardVisibilityFooter} from './di-dashboard-options';

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;

  const mockFooter$ = new BehaviorSubject(false);

  afterAll(() => {
    mockFooter$.complete();
  });

  beforeEach(() => MockBuilder(DashboardComponent).mock(DiDashboardVisibilityFooter, mockFooter$));

  beforeEach(() => {
    mockFooter$.next(false);
    fixture = MockRender(DashboardComponent);
    fixture.detectChanges();
  });

  it('creates instance', () => expect(fixture.componentInstance).toBeTruthy());

  it(`renders`, () => expect(fixture).toMatchSnapshot());

  describe(`with visible footer`, () => {
    beforeEach(() => {
      mockFooter$.next(true);
      fixture.detectChanges();
    });

    it(`renders`, () => expect(fixture).toMatchSnapshot());

    it(`has footer`, () => expect(findDirective(fixture, FooterComponent)).toBeTruthy());
  });
});
