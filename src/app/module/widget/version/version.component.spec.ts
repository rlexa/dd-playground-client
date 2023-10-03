import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {MockBuilder, MockRender} from 'ng-mocks';
import {of} from 'rxjs';
import {DiGlobalVersion} from 'src/app/di-global';
import {mockAll} from 'src/app/test';
import {VersionComponent} from './version.component';

describe('VersionComponent', () => {
  let fixture: ComponentFixture<VersionComponent>;

  beforeEach(() =>
    MockBuilder(VersionComponent)
      .provide(mockAll(Router))
      .provide({provide: DiGlobalVersion, useValue: of('version')}),
  );

  beforeEach(() => {
    fixture = MockRender(VersionComponent);
    fixture.detectChanges();
  });

  test('renders', () => expect(fixture).toMatchSnapshot());

  test('navigates on version click', () => {
    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', {});
    expect(TestBed.inject(Router).navigate).toHaveBeenCalledTimes(1);
  });
});
