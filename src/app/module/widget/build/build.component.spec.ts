import {TestBed} from '@angular/core/testing';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {RouterTestingModule} from '@angular/router/testing';
import {MockComponents} from 'ng-mocks';
import {of} from 'rxjs';
import {DiGlobalFlags, GlobalFlags} from 'src/app/di-global';
import {detectChanges, overrideForChangeDetection} from 'src/app/test';
import {SimpleViewComponent} from '../simple-view';
import {BuildComponent} from './build.component';

describe('BuildComponent', () => {
  const flags: GlobalFlags = {
    buildId: 'buildId',
    buildRevision: 'buildRevision',
    buildSystem: 'buildSystem',
    buildVariant: 'buildVariant',
    project: 'project',
    projectParent: 'projectParent',
    title: 'title',
    version: 'version',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [BuildComponent, MockComponents(MatCard, MatCardTitle, MatCardContent, SimpleViewComponent)],
      providers: [{provide: DiGlobalFlags, useValue: of(flags)}],
    })
      .overrideComponent(BuildComponent, overrideForChangeDetection)
      .compileComponents();
  });

  test('is created', () => {
    const fixture = TestBed.createComponent(BuildComponent);
    detectChanges(fixture);
    expect(fixture).toMatchSnapshot();
  });
});
