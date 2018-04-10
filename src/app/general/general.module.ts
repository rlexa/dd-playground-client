import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconPipe, RipupperPipe, UppercasePipe } from '.';

@NgModule({
  imports: [CommonModule],
  declarations: [
    IconPipe,
    RipupperPipe,
    UppercasePipe
  ],
  exports: [
    IconPipe,
    RipupperPipe,
    UppercasePipe
  ]
})
export class GeneralModule { }
