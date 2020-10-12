import {TestBed} from '@angular/core/testing';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatList} from '@angular/material/list';
import {MockComponents} from 'ng-mocks';
import {detectChanges, overrideForChangeDetection} from 'src/app/test';
import {OverviewComponent} from './overview.component';

describe('OverviewComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [OverviewComponent, MockComponents(MatCard, MatCardTitle, MatCardContent, MatList)],
      providers: [],
    })
      .overrideComponent(OverviewComponent, overrideForChangeDetection)
      .compileComponents();
  });

  test('is created', () => {
    const fixture = TestBed.createComponent(OverviewComponent);
    detectChanges(fixture);
    expect(fixture).toMatchSnapshot();
  });
});
