import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MockComponents} from 'ng-mocks';
import {detectChanges, overrideForChangeDetection} from 'src/app/test';
import {VersionComponent} from '../version';
import {FooterComponent} from './footer.component';

describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [FooterComponent, MockComponents(VersionComponent)],
      providers: [],
    })
      .overrideComponent(FooterComponent, overrideForChangeDetection)
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    detectChanges(fixture);
  });

  it('creates instance', () => expect(fixture.componentInstance).toBeTruthy());
  it(`renders`, () => expect(fixture).toMatchSnapshot());
});
