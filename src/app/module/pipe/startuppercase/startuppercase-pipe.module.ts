import {NgModule} from '@angular/core';
import {StartuppercasePipe} from './startuppercase.pipe';

@NgModule({exports: [StartuppercasePipe], declarations: [StartuppercasePipe]})
class StartuppercasePipeModule {}

export {StartuppercasePipeModule, StartuppercasePipe};
