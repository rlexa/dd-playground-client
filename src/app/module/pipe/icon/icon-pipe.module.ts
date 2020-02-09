import {NgModule} from '@angular/core';
import {IconPipe} from './icon.pipe';

@NgModule({exports: [IconPipe], declarations: [IconPipe]})
class IconPipeModule {}

export {IconPipeModule, IconPipe};
