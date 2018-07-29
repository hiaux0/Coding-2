/**
 * Note that this is actually not a resuable component yet.
 */

import {bindable, inject} from 'aurelia-framework';
import './simple-list.less';
import db from '../../../../../../db';

/**
 * Takes in 2 objects with an `position` property, and sorts them according to that `position`.
 * 
 * @param {Object} a - object with order property
 * @param {Object} b - object with order property
 */
const _comparePosition = (a, b) => {
  return a.position - b.position;
}

@inject(Element)
export class SimpleList {
  @bindable allowDragRef;
  
  simpleListRef;

  constructor(element) {
    this.element = element;
    this.db = db;
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

  mouseOverHandler() {
    console.log('mouse over')
  }
}

