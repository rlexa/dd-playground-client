import {async, TestBed} from '@angular/core/testing';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatList} from '@angular/material/list';
import {RouterTestingModule} from '@angular/router/testing';
import {MockComponents} from 'ng-mocks';
import {detectChanges, overrideForChangeDetection} from 'src/app/test';
import {ConfigComponent} from './config.component';

describe('ConfigComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ConfigComponent, MockComponents(MatCard, MatCardTitle, MatCardContent, MatList)],
      providers: [],
    })
      .overrideComponent(ConfigComponent, overrideForChangeDetection)
      .compileComponents();
  }));

  test('is created', () => {
    const fixture = TestBed.createComponent(ConfigComponent);
    detectChanges(fixture);
    expect(fixture).toMatchSnapshot();
  });
});
