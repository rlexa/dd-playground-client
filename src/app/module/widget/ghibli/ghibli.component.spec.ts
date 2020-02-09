import {async, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {GhibliComponent} from './ghibli.component';
import {imports} from './imports';

describe('GhibliComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule, ...imports],
      declarations: [GhibliComponent],
      providers: [],
    }).compileComponents();
  }));

  test('is created', () => {
    const fixture = TestBed.createComponent(GhibliComponent);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
