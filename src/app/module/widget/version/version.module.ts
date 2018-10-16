import { NgModule } from '@angular/core';
import { imports } from './imports';
import { VersionComponent } from './version.component';

@NgModule({ imports, exports: [VersionComponent], declarations: [VersionComponent] })
export class VersionModule { }
