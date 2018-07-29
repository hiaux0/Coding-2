import {bindable} from 'aurelia-framework';
import interact from 'interactjs';

export class DragContainer {
  constructor() {
    window.dc = this
    this.interact = interact;
  }
}

