import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {MockComponents} from 'ng-mocks';
import {of} from 'rxjs';
import {detectChanges, overrideForChangeDetection} from 'src/app/test';
import {Mock} from 'ts-mockery';
import {NavigationBarComponent} from '../navigation-bar';
import {NavigationContentComponent, NavigationContentComponentData} from './navigation-content.component';

describe('NavigationContentComponent', () => {
  let fixture: ComponentFixture<NavigationContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavigationContentComponent, MockComponents(NavigationBarComponent)],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: Mock.from<ActivatedRoute>({data: of<NavigationContentComponentData>({navigationContentScrollable: true})}),
        },
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
});
