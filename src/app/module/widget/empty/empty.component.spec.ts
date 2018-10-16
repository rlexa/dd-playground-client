import { async, TestBed } from '@angular/core/testing';
import { EmptyComponent } from './empty.component';

describe('EmptyComponent', () => {
  beforeEach(async(() => {
    TestBed.configureCompiler(<any>{ preserveWhitespaces: false }).configureTestingModule({
      imports: [], declarations: [EmptyComponent], providers: [],
    }).compileComponents();
  }));

  test('is created', () => {
    const fixture = TestBed.createComponent(EmptyComponent);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
