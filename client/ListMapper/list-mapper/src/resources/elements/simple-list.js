import {bindable} from 'aurelia-framework';
import './simple-list.less';

export class SimpleList {
  @bindable listData = [];

  simpleListRef;

  constructor(element) {
    window.simpleList = this
    this.element = element;
    this.direction = '';
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
  }

  sortDescending() {
    this.direction = 'descending';
  }

  sortAscending() {
    this.direction = 'ascending';
  }
}


