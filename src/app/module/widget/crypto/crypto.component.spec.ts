import {async, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {CryptoComponent} from './crypto.component';
import {imports} from './imports';

describe('CryptoComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule, ...imports],
      declarations: [CryptoComponent],
      providers: [],
    }).compileComponents();
  }));

  test('is created', () => {
    const fixture = TestBed.createComponent(CryptoComponent);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
