import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'startuppercase', pure: true, standalone: true})
export class StartuppercasePipe implements PipeTransform {
  transform(value: string | null | undefined): any {
    return value?.length > 0 ? value[0].toUpperCase() + value.slice(1) : value;
  }
}
