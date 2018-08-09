import {bindable, inject} from 'aurelia-framework';
import './simple-list.less';
import db from '../../../../../../db';
import { EventAggregator } from 'aurelia-event-aggregator';

/**
 * Takes in 2 objects with an `position` property, and sorts them according to that `position`.
 * 
 * @param {Object} a - object with order property
 * @param {Object} b - object with order property
 */
const _comparePosition = (a, b) => {
  return a.position - b.position;
}

@inject(Element, EventAggregator)
export class SimpleList {
  @bindable listData = [];

  simpleListRef;
  newListData = null;

  constructor(element, eventAggregator) {
    window.simpleList = this
    this.element = element;
    this.eventAggregator = eventAggregator;
    this.db = db;

    this.subscriptions = [];

    this.ctrl = this.sortOrder(this.db.shortcuts);
    this.commandName = this.sortOrder(this.db.commands);

    this.shortcutStore = {
      ctrl: this.ctrl,
      commandName: this.commandName
    }
  }

  /**
   * Sort object according to its order propety.
   * // TODO use value converter
   * @param {Object} obj 
   */
  sortOrder(arr) {
    // return (arr);
    return arr.sort(_comparePosition);
  }

  getDragDropChanges() {
    let newListData = new Array; // Need to declare new array here?
    let children = this.simpleListRef.children
    let counter = 0;

    for (let child of children) {
      if (!child.classList.contains("item-container")) continue;
      
      let listItem = child.getElementsByTagName('li')[0]
      let listItemContent = listItem.innerText;
      newListData.push({
        content: listItemContent,
        position: counter++,
        htmlElement: listItem,
      });
    }
  }

}

