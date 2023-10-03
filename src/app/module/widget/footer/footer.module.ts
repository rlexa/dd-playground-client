import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {VersionComponent} from '../version';
import {FooterComponent} from './footer.component';

@NgModule({imports: [CommonModule, VersionComponent], exports: [FooterComponent], declarations: [FooterComponent]})
class FooterModule {}

export {FooterComponent, FooterModule};
