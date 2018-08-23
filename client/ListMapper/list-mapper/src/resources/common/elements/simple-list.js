import {bindable} from 'aurelia-framework';
import {chevronDown, chevronUp} from '../styles/icons';
import './simple-list.less';
import Sortable from 'sortablejs';

export class SimpleList {
  @bindable listData = [];
  @bindable id;

  simpleListRef;

  constructor(element) {
    this.element = element;
    this.direction = 'ascending';
    // icons
    this.chevronDown = chevronDown;
    this.chevronUp = chevronUp;

    setTimeout(() => {
      this.initSortable();
    }, 0)
  }

  initSortable() {
    this.sortableInstance = new Sortable(this.simpleListRef, {
      group: "123",
      draggable: ".list-item",
      animation: 100,

    });
  }

  /**
   * Iterate through simpleListRef and 
   * @returns relevant data (htmlElement, position and innerText)
   */
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
    return newListData;
  }

  sortDescending() {
    this.direction = 'descending';
    return true;
  }
  
  sortAscending() {
    this.direction = 'ascending';
    return true;
  }
}


