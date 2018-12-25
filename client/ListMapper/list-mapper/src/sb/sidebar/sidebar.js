import {bindable} from 'aurelia-framework';
import './sidebar.less'

export class Sidebar {
  /**
   * @type {string} [top, right, bottom, left]
   */
  @bindable position = 'left';

}
