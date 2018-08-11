import {inject} from 'aurelia-framework';
import hotkeys from 'hotkeys-js';

@inject(Element)
export class UpDownNavigationCustomAttribute {
  constructor(element) {
    /**
     * Represents the index of the current highlighted item.
     */
    this.currentHighlightIndex = 0;
    this.nextDownIndex = 0;
    this.nextUpIndex = 0;

    this.element = element;
    window.element = element;
    this.hotkey = null;
  }

  attached() {
    this.initShortCuts();
    this.upNavigation();
    this.downNavigation();
    console.log(this.element);
  }

  initShortCuts() {
    // Init hotkeys
    this.hotkey = hotkeys.noConflict();
    hotkeys.filter = function () { return true }; // 2018-08-09 23:30:46 what does this do?
  }

  upNavigation() {
    this.hotkey('up', () => {
      console.log('up')
    })
  }

  downNavigation() {
    this.hotkey('down', () => {
      console.log('down')
      this.goDownListItem(this.element);
    })
  }

  /**
   * Go down list item, by highlighting the the dropdown item
   * @param {HTML.Element} element - Html element provided by Aurelia, represents the HTML Element, the attribute is used on.
   */
  goDownListItem(element) {
    let children = element.children;

    // if (this.currentHighlightIndex === 0) {
    //   children[0].classList.add('active')
    //   return;
    // } 
    
    this.nextDownIndex = ++this.currentHighlightIndex;
    this.deactivateDropdownItem(children[this.currentHighlightIndex]);
    this.activateDropdownItem(children[this.nextDownIndex]);

  }

  activateDropdownItem(item) {
    item.classList.add('active');
  }

  deactivateDropdownItem(item) {
    console.log('​UpDownNavigationCustomAttribute -> deactivateDropdownItem -> item', item);
    item.classList.remove('active');
  }

  valueChanged(newValue, oldValue) {

  }
}

