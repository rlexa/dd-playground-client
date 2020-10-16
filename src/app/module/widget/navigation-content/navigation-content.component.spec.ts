import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MockComponents} from 'ng-mocks';
import {detectChanges, overrideForChangeDetection} from 'src/app/test';
import {NavigationBarComponent} from '../navigation-bar';
import {NavigationContentComponent} from './navigation-content.component';

describe('NavigationContentComponent', () => {
  let fixture: ComponentFixture<NavigationContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavigationContentComponent, MockComponents(NavigationBarComponent)],
      providers: [],
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
});
