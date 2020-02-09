import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatButton} from '@angular/material/button';
import {By} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {MockComponents} from 'ng-mocks';
import {provideRxState} from 'src/app/rx-state/test';
import {detectChanges, getByType, mockAll, overrideForChangeDetection} from 'src/app/test';
import {VersionComponent} from './version.component';

describe('VersionComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [VersionComponent, MockComponents(MatButton)],
      providers: [provideRxState, mockAll(Router)],
    })
      .overrideComponent(VersionComponent, overrideForChangeDetection)
      .compileComponents();
  }));

  let fixture: ComponentFixture<VersionComponent>;

  beforeEach(() => (fixture = TestBed.createComponent(VersionComponent)));

  test('is created', () => {
    detectChanges(fixture);
    expect(fixture).toMatchSnapshot();
  });

  test('navigates on version click', () => {
    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', {});
    expect(getByType(Router).navigate).toHaveBeenCalledTimes(1);
  });
});
