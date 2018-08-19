import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {toggleHotkeyScope} from '../../application-key-bindings/toggle-scope';
import hotkeys from 'hotkeys-js';

import {INPUT_DROPDOWN_DOWN, INPUT_DROPDOWN_UP, INPUT_DROPDOWN_ENTER} from '../../application-key-bindings/app.keys';

const ACTIVE_CLASS = 'active';
const UP_DOWN_SCOPE = 'up-down-navigation';

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

    let previousScope = hotkeys.getScope();
    this.activateItem(previousScope);
    
    this.upNavigation();
    this.downNavigation();

    hotkeys.setScope(UP_DOWN_SCOPE);
  }

  initShortCuts() {
    // Init hotkeys
    this.hotkey = hotkeys.noConflict();
    hotkeys.filter = function () { return true }; // 2018-08-09 23:30:46 what does this do?
    // hotkeys.setScope(UP_DOWN_SCOPE);
  }

  upNavigation() {
    this.hotkey(INPUT_DROPDOWN_UP, UP_DOWN_SCOPE,() => {
      this.goUpListItem(this.element);
    })
  }

  /**
   * Register up/down movement shortcut for moving in input-dropdown
   */
  downNavigation() {
    this.hotkey(INPUT_DROPDOWN_DOWN, UP_DOWN_SCOPE, () => {
      this.goDownListItem(this.element);
    })
  }

  /**
   * On `ENTER` press, execute/accept the given item.
   */
  activateItem(previousScope) {
    this.hotkey(INPUT_DROPDOWN_ENTER, UP_DOWN_SCOPE,() => {
      let currentItem = this.element.children[this.currentHighlightIndex];
      if (currentItem.classList.contains(ACTIVE_CLASS)) {
        this.commandId = currentItem.getAttribute('data-command-id');

        toggleHotkeyScope(true, UP_DOWN_SCOPE, previousScope);
        hotkeys.deleteScope('UP_DOWN_SCOPE');
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
    this.hotkey.unbind(INPUT_DROPDOWN_ENTER, UP_DOWN_SCOPE);
    this.hotkey.unbind(INPUT_DROPDOWN_DOWN, UP_DOWN_SCOPE);
    this.hotkey.unbind(INPUT_DROPDOWN_UP, UP_DOWN_SCOPE);
    this.currentHighlightIndex = 0;
    hotkeys.deleteScope(UP_DOWN_SCOPE);
  }
}
