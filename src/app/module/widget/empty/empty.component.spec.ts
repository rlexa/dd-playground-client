import {async, TestBed} from '@angular/core/testing';
import {detectChanges, overrideForChangeDetection} from 'src/app/test';
import {EmptyComponent} from './empty.component';

describe('EmptyComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [EmptyComponent],
      providers: [],
    })
      .overrideComponent(EmptyComponent, overrideForChangeDetection)
      .compileComponents();
  }));

  test('is created', () => {
    const fixture = TestBed.createComponent(EmptyComponent);
    detectChanges(fixture);
    expect(fixture).toMatchSnapshot();
  });
});
