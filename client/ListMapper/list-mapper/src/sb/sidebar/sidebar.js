import {bindable} from 'aurelia-framework';
import './sidebar.less'
import { doubleArrowLeft } from '../../resources/common/styles/icons';

export class Sidebar {
  /**
   * @type {string} [top, right, bottom, left]
   */
  @bindable position = 'left';

  sidebarOpen = false;
  doubleArrowLeft = doubleArrowLeft;

  detached() {
    this.sidebarOpen = false;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }

}
