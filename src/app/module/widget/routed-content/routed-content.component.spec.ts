import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {imports} from './imports';
import {RoutedContentComponent} from './routed-content.component';

describe('RoutedContentComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ...imports],
      declarations: [RoutedContentComponent],
      providers: [],
    }).compileComponents();
  }));

  test('is created', () => {
    const fixture = TestBed.createComponent(RoutedContentComponent);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
