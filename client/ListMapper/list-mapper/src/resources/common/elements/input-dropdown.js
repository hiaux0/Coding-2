import {bindable} from 'aurelia-framework';

export class InputDropdown {
  @bindable value;
  @bindable simpleCommand;
  @bindable showCommandPalett;
  @bindable key;

  submitCommand() {
    console.log('submit command');
  }
}

