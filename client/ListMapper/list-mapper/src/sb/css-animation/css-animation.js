import { bindable } from 'aurelia-framework';
import './css-animation.less'

export class CssAnimation {
  @bindable value = 'okok';

  valueChanged(newValue, oldValue) {
    let ok = newValue;
    console.log('TCL: CssAnimation -> valueChanged -> newValue', newValue);
    // value
    // okay then do sth.
  }

}
