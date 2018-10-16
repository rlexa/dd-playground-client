import { NgModule } from '@angular/core';
import { imports } from './imports';
import { LoadingBarComponent } from './loading-bar.component';

@NgModule({ imports, exports: [LoadingBarComponent], declarations: [LoadingBarComponent] })
export class LoadingBarModule { }
