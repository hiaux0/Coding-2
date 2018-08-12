import {inject} from 'aurelia-framework';

@inject(Element)
export class ConnectListItemsCustomAttribute {
  
  constructor(element) {
    this.element = element;
  }

}

