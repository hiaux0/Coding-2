import {bindable} from 'aurelia-framework';
import './dragdrop.less'
import Sortable from 'sortablejs';

export class Dragdrop {
  @bindable value = 'Dragdrop';

  valueChanged(newValue, oldValue) {

  }

  bind() {
    Sortable.create(this.what)
  }
}
