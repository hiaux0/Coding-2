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
  @bindable passDataToSidebar = () => {};

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
    const triggerElements = document.querySelectorAll(this.trigger);

    for (let trigger of triggerElements) {
      trigger.addEventListener('click', (event) => {
        const target = event.target;
        this.passDataToSidebar(event);
        this.sidebarOpen = true;
      });
    }
  }

  closeSidebarOnOutsideClick() {
    this.outsideClickSidebar = closeOnOutsideClick(this.sidebarRef, (ev) => {
      if (ev.target.classList.contains('lyrics-word')) return;
      if (ev.target.classList.contains('btn')) return;
      this.sidebarOpen = false;
    });
    document.addEventListener('click', this.outsideClickSidebar);
  }

  closeSidebar() {
    this.sidebarOpen = false;
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
  }



}
