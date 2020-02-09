import {NgModule} from '@angular/core';
import {EmptyComponent} from './empty.component';

@NgModule({imports: [], exports: [EmptyComponent], declarations: [EmptyComponent]})
class EmptyModule {}

export {EmptyModule, EmptyComponent};
