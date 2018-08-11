import {bindable} from 'aurelia-framework';
import './input-dropdown.less';

export class InputDropdown {
  @bindable commandId;
  @bindable key;
  @bindable simpleCommand;
  @bindable showCommandPalett;
  @bindable value = window.DEBUG_MODE ? 'Say' : '';
}
