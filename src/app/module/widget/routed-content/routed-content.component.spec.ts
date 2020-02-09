import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {detectChanges, overrideForChangeDetection} from 'src/app/test';
import {RoutedContentComponent} from './routed-content.component';

describe('RoutedContentComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [RoutedContentComponent],
      providers: [],
    })
      .overrideComponent(RoutedContentComponent, overrideForChangeDetection)
      .compileComponents();
  }));

  test('is created', () => {
    const fixture = TestBed.createComponent(RoutedContentComponent);
    detectChanges(fixture);
    expect(fixture).toMatchSnapshot();
  });
});
