import {bindable} from 'aurelia-framework';
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
  /**
   * @param {String}
   */
  constructor() {
    this.value = window.DEBUG_MODE.commandPalett ? 'Change' : '';
    this.suggestedList = null;
  }

}