import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatButton} from '@angular/material/button';
import {MatList, MatListItem} from '@angular/material/list';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MockComponents, MockDirectives, MockPipe, MockPipes} from 'ng-mocks';
import {detectChanges, overrideForChangeDetection} from 'src/app/test';
import {FlexboxDirective} from '../../directive/flexbox';
import {IconPipe} from '../../pipe/icon';
import {RipupperPipe} from '../../pipe/ripupper';
import {StartuppercasePipe} from '../../pipe/startuppercase';
import {SimpleViewComponent} from './simple-view.component';

describe('SimpleViewComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [
        SimpleViewComponent,
        MockComponents(MatButton, MatList, MatListItem),
        MockDirectives(FlexboxDirective),
        MockPipes(RipupperPipe, StartuppercasePipe),
        MockPipe(IconPipe, (val) => `icon ${val}`),
      ],
      providers: [],
    })
      .overrideComponent(SimpleViewComponent, overrideForChangeDetection)
      .compileComponents();
  });

  let fixture: ComponentFixture<SimpleViewComponent<any>>;

  beforeEach(() => (fixture = TestBed.createComponent(SimpleViewComponent)));

  test('is created', () => {
    detectChanges(fixture);
    expect(fixture).toMatchSnapshot();
  });

  describe(`with data`, () => {
    beforeEach(() => {
      fixture.componentInstance.data = {key: 'value'};
      detectChanges(fixture);
    });

    test(`renders`, () => expect(fixture).toMatchSnapshot());
  });
});
