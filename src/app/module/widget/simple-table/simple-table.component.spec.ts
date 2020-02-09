import {async, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {imports} from './imports';
import {SimpleTableComponent} from './simple-table.component';

describe('SimpleTableComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, ...imports],
      declarations: [SimpleTableComponent],
      providers: [],
    }).compileComponents();
  }));

  test('is created', () => {
    const fixture = TestBed.createComponent(SimpleTableComponent);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
