import {NgModule} from '@angular/core';
import {FlatPipe} from './flat.pipe';

@NgModule({exports: [FlatPipe], declarations: [FlatPipe]})
class FlatPipeModule {}

export {FlatPipeModule, FlatPipe};
