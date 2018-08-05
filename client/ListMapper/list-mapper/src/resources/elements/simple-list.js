/**
 * Note that this is actually not a resuable component yet.
 */

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
  // @bindable allowDragRef;
  @bindable listData = [];

  // listDataChanged() {
  //   console.log(this.listData);
  // }

  simpleListRef;

  constructor(element, eventAggregator) {
    window.simpleList = this
    this.element = element;
    this.eventAggregator = eventAggregator;
    this.db = db;

    this.subscriptions = [];

    this.ctrl = this.sortOrder(this.db.shortcuts);
    this.commandName = this.sortOrder(this.db.commands);
    // Add property, that stores html element
    this.addHtmlStorage(this.ctrl);

    this.shortcutStore = {
      ctrl: this.ctrl,
      commandName: this.commandName
    }
  }

  attached() {
    this.subscriptions.push(
      this.eventAggregator.subscribe('drag-drop:draggel-swapped', (newList) => {
        // console.log('​SimpleList -> attached -> newList', newList);
        this.listData = newList;
      })
    )
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

  /**
   * Add property to each object, to store the corresponding html element
   */
  addHtmlStorage(arr) {
    arr.forEach((ele) => {
      Object.assign(ele, {htmlElement: null})
    })
  }

  mouseOverHandler() {
    // consdsole.log('mouse over')
  }
}

