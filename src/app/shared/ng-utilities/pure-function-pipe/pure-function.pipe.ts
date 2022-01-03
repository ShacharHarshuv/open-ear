import {
  Pipe, PipeTransform,
} from '@angular/core';

@Pipe({
  name: 'pureFunction',
  pure: true,
})
export class PureFunctionPipe implements PipeTransform {
  transform<T, U extends Array<any>>(pureFunction: (...args: U) => T, ...functionArgs: U): T {
    return pureFunction(...functionArgs);
  }
}
