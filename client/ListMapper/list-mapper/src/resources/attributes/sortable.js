import {bindable, inject} from 'aurelia-framework';
import Sortable from 'sortablejs';

@inject(Element)
export class SortableCustomAttribute {
  @bindable active = true;
  @bindable ordered = false;

  constructor(element) {
    this.element = element;
  }

  get context() {
    // Handle mixed case 
    let listAnchor = 
      this.element.getElementsByTagName('ul') 
      || this.element.getElementsByTagName('ol');
    return listAnchor || this.element;
  }

  attached() {
    this.initSortable();
  }

  activeChanged() {
    // Make sure elements are rendered
    setTimeout(() => {
      this.initSortable();
    }, 0)
  }

  initSortable() {
    if (!this.active) return;

    // Make multiple lists draggable
    // console.log(this.context)
    if (this.context.constructor.name === "HTMLCollection" ) {
      for (let listAnchor of this.context) {
        this.sortableInstance = new Sortable(listAnchor, {
          group: '123',
          draggable: 'li',
          animation: 100,
        });
      }
      return;
    }
    
    this.sortableInstance = new Sortable(this.context, {
      group: '123',
      draggable: 'li',
      animation: 100,
    });

    // console.log(this.sortableInstance)
  }

}

