import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {MatTooltip} from '@angular/material/tooltip';
import {RouterTestingModule} from '@angular/router/testing';
import {MockComponents, MockDirectives, MockPipe} from 'ng-mocks';
import {detectChanges, overrideForChangeDetection} from 'src/app/test';
import {IconPipe} from '../../pipe/icon';
import {NavigationBarComponent, NavigationBarItem} from './navigation-bar.component';

describe('NavigationBarComponent', () => {
  let fixture: ComponentFixture<NavigationBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        NavigationBarComponent,
        MockComponents(MatToolbar, MatButton),
        MockDirectives(MatTooltip),
        MockPipe(IconPipe, (val) => `icon ${val}`),
      ],
      providers: [],
    })
      .overrideComponent(NavigationBarComponent, overrideForChangeDetection)
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBarComponent);
    detectChanges(fixture);
  });

  it('creates instance', () => expect(fixture.componentInstance).toBeTruthy());
  it(`renders`, () => expect(fixture).toMatchSnapshot());

  describe(`with items`, () => {
    beforeEach(() => {
      fixture.componentInstance.items = [1, 2, 3].map<NavigationBarItem>((ii) => ({
        icon: `icon${ii}`,
        label: `label${ii}`,
        route: `route${ii}`,
      }));
      detectChanges(fixture);
    });

    it(`renders`, () => expect(fixture).toMatchSnapshot());

    describe(`with layout column`, () => {
      beforeEach(() => {
        fixture.componentInstance.layout = 'column';
        detectChanges(fixture);
      });

      it(`renders`, () => expect(fixture).toMatchSnapshot());
    });
  });
});
