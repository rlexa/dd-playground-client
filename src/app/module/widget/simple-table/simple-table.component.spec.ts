import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatFormField} from '@angular/material/form-field';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatColumnDef, MatHeaderRowDef, MatRowDef, MatTable} from '@angular/material/table';
import {MockComponents, MockDirectives, MockPipes} from 'ng-mocks';
import {detectChanges, overrideForChangeDetection} from 'src/app/test';
import {FlexboxDirective} from '../../directive/flexbox';
import {RipupperPipe} from '../../pipe/ripupper';
import {StartuppercasePipe} from '../../pipe/startuppercase';
import {SimpleTableComponent} from './simple-table.component';

describe('SimpleTableComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        SimpleTableComponent,
        MockComponents(MatFormField, MatPaginator),
        MockDirectives(MatColumnDef, MatHeaderRowDef, MatRowDef, MatSort, MatSortHeader, MatTable, FlexboxDirective),
        MockPipes(RipupperPipe, StartuppercasePipe),
      ],
      providers: [],
    })
      .overrideComponent(SimpleTableComponent, overrideForChangeDetection)
      .compileComponents();
  }));

  let fixture: ComponentFixture<SimpleTableComponent>;

  beforeEach(() => (fixture = TestBed.createComponent(SimpleTableComponent)));

  test('is created', () => {
    detectChanges(fixture);
    expect(fixture).toMatchSnapshot();
  });

  describe(`with data`, () => {
    beforeEach(() => {
      fixture.componentInstance.data = [
        {col0: 'row0', col1: 'row0'},
        {col0: 'row1', col1: 'row1'},
      ];
      detectChanges(fixture);
    });

    test(`renders`, () => expect(fixture).toMatchSnapshot());
  });
});
