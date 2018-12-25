import {bindable} from 'aurelia-framework';
import './sidebar.less'

export class Sidebar {
  /**
   * @type {string} [top, right, bottom, left]
   */
  @bindable position = 'left';

  sidebarOpen = false;

  detached() {
    this.sidebarOpen = false;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

}
