import {bindable} from 'aurelia-framework';
import './input-dropdown.less'

export class InputDropdown {
  @bindable value = window.DEBUG_MODE ? 'Say' : '';
  @bindable simpleCommand;
  @bindable showCommandPalett;
  @bindable key;

  submitCommand() {
    console.log('submit command');
  }
}

