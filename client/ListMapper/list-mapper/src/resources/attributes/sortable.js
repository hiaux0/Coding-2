import {inject} from 'aurelia-framework';
import Sortable from 'sortablejs';

@inject(Element)
export class SortableCustomAttribute {

  constructor(element) {
    this.element = element;
  }

  attached() {
    this.initSortable();
  }

  initSortable() {
    this.sortableInstance = new Sortable(this.element, {
      group: '123',
      draggable: 'li',
      animation: 100,
    });
  }

}

