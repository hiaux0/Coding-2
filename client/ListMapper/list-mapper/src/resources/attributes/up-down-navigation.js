import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import hotkeys from 'hotkeys-js';

const ACTIVE_CLASS = 'active';
const INPUT_DROPDOWN_DOWN = 'down, ctrl+j';
const INPUT_DROPDOWN_UP = 'up, ctrl+k';
const INPUT_DROPDOWN_ENTER = 'enter';

@inject(Element, EventAggregator)
export class UpDownNavigationCustomAttribute {
  /**
   * Since, `ENTER` is allowed on a dropdown item,
   * @param {String} commandId has the id, in order to execute that item.
   * TODO : Note that currently, `ENTER` does not support simply "accepting" the item.
   */
  
  @bindable commandId;
  @bindable suggestedList;

  constructor(element, eventAggregator) {
    this.element = element;
    this.eventAggregator = eventAggregator;
    /**
     * Represents the index of the current highlighted item.
     */
    this.currentHighlightIndex = 0;
    this.hotkey = null;
  }
 
  suggestedListChanged() {
    this.currentHighlightIndex = 0;
  }

  attached() {
    this.initShortCuts();
    this.upNavigation();
    this.downNavigation();
    this.activateItem();
  }

  initShortCuts() {
    // Init hotkeys
    this.hotkey = hotkeys.noConflict();
    hotkeys.filter = function () { return true }; // 2018-08-09 23:30:46 what does this do?
  }

  upNavigation() {
    this.hotkey(INPUT_DROPDOWN_UP, () => {
      this.goUpListItem(this.element);
    })
  }

  /**
   * Register up/down movement shortcut for moving in input-dropdown
   */
  downNavigation() {
    this.hotkey(INPUT_DROPDOWN_DOWN, () => {
      this.goDownListItem(this.element);
    })
  }

  /**
   * On `ENTER` press, execute/accept the given item.
   */
  activateItem() {
    this.hotkey(INPUT_DROPDOWN_ENTER, () => {
      let currentItem = this.element.children[this.currentHighlightIndex];
      if (currentItem.classList.contains(ACTIVE_CLASS)) {
        this.commandId = currentItem.getAttribute('data-command-id');
      }
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
    item.classList.add(ACTIVE_CLASS);
  }

  deactivateDropdownItem(item) {
    item.classList.remove(ACTIVE_CLASS);
  }

  detached() {
    this.hotkey.unbind(INPUT_DROPDOWN_ENTER);
    this.hotkey.unbind(INPUT_DROPDOWN_DOWN);
    this.hotkey.unbind(INPUT_DROPDOWN_UP);

    this.currentHighlightIndex = 0;
  }
}
