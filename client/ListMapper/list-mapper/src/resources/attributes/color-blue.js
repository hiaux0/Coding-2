import {inject} from 'aurelia-framework';

@inject(Element)
export class ColorBlueCustomAttribute {
  constructor(element) {
    this.element = element;
  }

  valueChanged(newValue, oldValue) {

  }
}

