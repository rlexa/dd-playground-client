import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {VersionComponent} from './version.component';

@NgModule({imports: [CommonModule, RouterModule, MatButtonModule], exports: [VersionComponent], declarations: [VersionComponent]})
class VersionModule {}

export {VersionModule, VersionComponent};
