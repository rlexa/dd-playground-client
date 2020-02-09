import {NgModule} from '@angular/core';
import {RipupperPipe} from './ripupper.pipe';

@NgModule({exports: [RipupperPipe], declarations: [RipupperPipe]})
class RipupperPipeModule {}

export {RipupperPipeModule, RipupperPipe};
