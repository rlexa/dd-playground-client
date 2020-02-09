import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexboxDirective } from './flexbox.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [FlexboxDirective],
  exports: [FlexboxDirective]
})
class FlexboxModule {}

export { FlexboxModule, FlexboxDirective };
