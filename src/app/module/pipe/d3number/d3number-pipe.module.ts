import {NgModule} from '@angular/core';
import {D3numberPipe} from './d3number.pipe';

@NgModule({exports: [D3numberPipe], declarations: [D3numberPipe]})
class D3numberPipeModule {}

export {D3numberPipeModule, D3numberPipe};
