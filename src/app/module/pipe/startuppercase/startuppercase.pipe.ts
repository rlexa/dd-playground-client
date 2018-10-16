import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'startuppercase', pure: true })
export class StartuppercasePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return typeof (value) === 'string' && value.length > 0 ? value[0].toUpperCase() + value.substr(1) : value;
  }

}
