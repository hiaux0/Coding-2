import {bindable} from 'aurelia-framework';
import './sidebar.less'
import { doubleArrowLeft } from '../../resources/common/styles/icons';
import closeOnOutsideClick from '../../resources/common/html-helpers/close-on-outside-click';

export class Sidebar {
  /**
   * @type {string} [top, right, bottom, left]
   */
  @bindable position = 'left';

  /**
   * @type {CSSSelector}
   */
  @bindable trigger;

  /**
   * @type {Function}
   */
  @bindable onSidebarClose = () => {};

  /**
   * @type {Function}
   */
  @bindable onSidebarOpen = () => {};

  sidebarOpen = false;
  doubleArrowLeft = doubleArrowLeft;

  attached() {
    this.initSidebar();
    this.closeSidebarOnOutsideClick();
  }

  detached() {
    this.sidebarOpen = false;
  }

  initSidebar() {
    document.addEventListener('click', (event) => {
      const {target} = event;
      if (!target.classList.contains(this.trigger)) return;

      this.onSidebarOpen(event);
      this.openSidebarBottom();
    });
  }

  closeSidebarOnOutsideClick() {
    this.outsideClickSidebar = closeOnOutsideClick(this.sidebarRef, (ev) => {
      if (ev.target.classList.contains('lyrics-word')) return;
      if (ev.target.classList.contains('btn')) return;
      this.onSidebarClose();
      this.closeSidebar();
    });
    document.addEventListener('click', this.outsideClickSidebar);
  }

  closeSidebar() {
    this.sidebarOpen = false;
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('sidebar-bottom-open');
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////
  //
  //      TESTING
  //^
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  openSidebarLeft() {
    this.sidebarRef.classList.remove('sidebar-bottom');
    this.sidebarOpen = true;
  }

  openSidebarBottom() {
    this.sidebarRef.classList.add('sidebar-bottom');
    this.sidebarOpen = true;
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('no-animation'); // this class prevents animation on page load
    body.classList.add('sidebar-bottom-open');
  }



}
