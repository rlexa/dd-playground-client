import { NgModule } from '@angular/core';
import { imports } from './imports';
import { SimpleViewComponent } from './simple-view.component';

@NgModule({ imports, exports: [SimpleViewComponent], declarations: [SimpleViewComponent] })
export class SimpleViewModule { }
