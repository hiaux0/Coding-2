import {bindable, observable} from 'aurelia-framework';
import './input-dropdown.less';

export class InputDropdown {
  /**
   * @param {String}
   */
  @bindable commandId;
  /**
   * @param {String}
   */
  @bindable key;
  /**
   * @param {Arary}
   */
  @bindable commandList;
  /**
   * @param {Boolean}
   */
  @bindable showCommandPalett;

  constructor() {
    this.value = window.DEBUG_MODE.commandPalett ? 'Change' : '';
    this.suggestedList = null;
  }

  detached() {
    this.value = ""
  }

}