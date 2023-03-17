import {
  Component,
  Input
} from "@angular/core";

/**
 * For debugging purposes only
 * */
@Component({
  selector: 'app-console-log',
  template: '',
})
export class ConsoleLogComponent {
  @Input('message')
  set message(msg: any) {
    console.log(msg);
  }

  constructor() {}
}
