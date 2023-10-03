import {ComponentFixture} from '@angular/core/testing';
import {MockBuilder, MockRender} from 'ng-mocks';
import {of} from 'rxjs';
import {DiGlobalFlags} from 'src/app/di-global';
import {BuildComponent} from './build.component';

describe('BuildComponent', () => {
  let fixture: ComponentFixture<BuildComponent>;

  beforeEach(() => MockBuilder(BuildComponent).provide({provide: DiGlobalFlags, useValue: of('globalFlags')}));

  beforeEach(() => {
    fixture = MockRender(BuildComponent);
    fixture.detectChanges();
  });

  test('renders', () => expect(fixture).toMatchSnapshot());
});
