import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {VersionModule} from '../version';
import {FooterComponent} from './footer.component';

@NgModule({imports: [CommonModule, VersionModule], exports: [FooterComponent], declarations: [FooterComponent]})
class FooterModule {}

export {FooterModule, FooterComponent};
