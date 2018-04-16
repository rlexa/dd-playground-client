import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { D3numberPipe, IconPipe, RipupperPipe, UppercasePipe } from '.';

@NgModule({
  imports: [CommonModule],
  declarations: [
    D3numberPipe,
    IconPipe,
    RipupperPipe,
    UppercasePipe,
  ],
  exports: [
    D3numberPipe,
    IconPipe,
    RipupperPipe,
    UppercasePipe,
  ]
})
export class GeneralModule { }
