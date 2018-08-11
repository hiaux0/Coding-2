import {bindable, inject} from 'aurelia-framework';
import hotkeys from 'hotkeys-js';

@inject(Element)
export class UpDownNavigationCustomAttribute {
  @bindable suggestedList;
  constructor(element) {
    /**
     * Represents the index of the current highlighted item.
     */
    this.currentHighlightIndex = 0;
    this.nextDownIndex = 0;
    this.nextUpIndex = 0;

    this.element = element;
    this.hotkey = null;
  }
 
  suggestedListChanged(newValue) {
    this.currentHighlightIndex = 0;
  }

  attached() {
    this.initShortCuts();
    this.upNavigation();
    this.downNavigation();
  }

  initShortCuts() {
    // Init hotkeys
    this.hotkey = hotkeys.noConflict();
    hotkeys.filter = function () { return true }; // 2018-08-09 23:30:46 what does this do?
  }

  upNavigation() {
    this.hotkey('up', () => {
      this.goUpListItem(this.element);
    })
  }

  downNavigation() {
    this.hotkey('down', () => {
      this.goDownListItem(this.element);
    })
  }

  /**
   * Go down list item, by highlighting the the dropdown item
   * @param {HTML.Element} element - Html element provided by Aurelia, represents the HTML Element, the attribute is used on.
   */
  goDownListItem(element) {
    let children = element.children;
    let numOfChildren = children.length;

    if (this.currentHighlightIndex === numOfChildren - 1) { // Current item is last in the list
      this.deactivateDropdownItem(children[this.currentHighlightIndex]);
      this.currentHighlightIndex = 0;
      this.activateDropdownItem(children[this.currentHighlightIndex]);
      return;
    }

    this.deactivateDropdownItem(children[this.currentHighlightIndex]);
    this.activateDropdownItem(children[this.currentHighlightIndex+1]);
    ++this.currentHighlightIndex;
  }

  /**
   * Go up list item, by highlighting the the dropdown item
   * @param {HTML.Element} element - Html element provided by Aurelia, represents the HTML Element, the attribute is used on.
   */
  goUpListItem(element) {
    let children = element.children;
    let numOfChildren = children.length;

    if (this.currentHighlightIndex === 0) { // Current item is last in the list
      this.deactivateDropdownItem(children[this.currentHighlightIndex]);
      this.currentHighlightIndex = numOfChildren - 1;
      this.activateDropdownItem(children[this.currentHighlightIndex]);
      return;
    }

    this.deactivateDropdownItem(children[this.currentHighlightIndex]);
    this.activateDropdownItem(children[this.currentHighlightIndex - 1]);
    --this.currentHighlightIndex;
  }

  activateDropdownItem(item) {
    item.classList.add('active');
  }

  deactivateDropdownItem(item) {
    item.classList.remove('active');
  }

}
