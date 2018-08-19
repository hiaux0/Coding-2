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

  // attached() {
  //   console.log(this.commandListContainerRef)
  //   let children = this.commandListContainerRef.children;
  //   console.log('​InputDropdown -> attached -> children', children);
  //   console.log('​InputDropdown -> attached -> children.length', children.length);
  //   console.log('​InputDropdown -> attached -> children[0]', children[0]);
  //   if (children) {
  //     // children[0].classList.add('active');
  //   }
  // }
}