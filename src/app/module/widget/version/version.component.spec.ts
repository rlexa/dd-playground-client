import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatButton} from '@angular/material/button';
import {By} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {MockComponents} from 'ng-mocks';
import {of} from 'rxjs';
import {DiGlobalVersion} from 'src/app/di-global';
import {detectChanges, mockAll, overrideForChangeDetection} from 'src/app/test';
import {VersionComponent} from './version.component';

describe('VersionComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [VersionComponent, MockComponents(MatButton)],
      providers: [mockAll(Router), {provide: DiGlobalVersion, useValue: of('version')}],
    })
      .overrideComponent(VersionComponent, overrideForChangeDetection)
      .compileComponents();
  });

  let fixture: ComponentFixture<VersionComponent>;

  beforeEach(() => (fixture = TestBed.createComponent(VersionComponent)));

  test('is created', () => {
    detectChanges(fixture);
    expect(fixture).toMatchSnapshot();
  });

  test('navigates on version click', () => {
    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', {});
    expect(TestBed.inject(Router).navigate).toHaveBeenCalledTimes(1);
  });
});
