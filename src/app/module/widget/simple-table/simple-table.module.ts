import {NgModule} from '@angular/core';
import {imports} from './imports';
import {SimpleTableComponent} from './simple-table.component';

@NgModule({imports, exports: [SimpleTableComponent], declarations: [SimpleTableComponent]})
class SimpleTableModule {}

export {SimpleTableModule, SimpleTableComponent};
