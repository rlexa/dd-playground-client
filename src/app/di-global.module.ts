import {NgModule} from '@angular/core';
import {DiGlobalFlagsProvider, DiGlobalTitleProvider, DiGlobalVersionProvider} from './di-global';

@NgModule({
  providers: [DiGlobalFlagsProvider, DiGlobalTitleProvider, DiGlobalVersionProvider],
})
export class DiGlobalModule {}
