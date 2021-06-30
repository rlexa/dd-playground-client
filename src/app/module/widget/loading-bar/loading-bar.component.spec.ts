import {TestBed, waitForAsync} from '@angular/core/testing';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MockComponents} from 'ng-mocks';
import {detectChanges, overrideForChangeDetection} from 'src/app/test';
import {LoadingBarComponent} from './loading-bar.component';

describe('LoadingBarComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [],
        declarations: [LoadingBarComponent, MockComponents(MatProgressBar)],
        providers: [],
      })
        .overrideComponent(LoadingBarComponent, overrideForChangeDetection)
        .compileComponents();
    }),
  );

  test('is created', () => {
    const fixture = TestBed.createComponent(LoadingBarComponent);
    detectChanges(fixture);
    expect(fixture).toMatchSnapshot();
  });
});
