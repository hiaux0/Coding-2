import {inject} from 'aurelia-framework';

@inject(Element)
export class SortCustomAttribute {
  constructor(element) {
    this.element = element;
  }

  valueChanged(newValue, oldValue) {

  }
}

