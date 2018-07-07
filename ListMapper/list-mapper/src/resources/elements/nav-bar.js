import {bindable} from 'aurelia-framework';
import './nav-bar.less';
import 'bootstrap';

export class NavBar {
  @bindable value;
  @bindable router;

  valueChanged(newValue, oldValue) {

  }
  attached() {
    console.log(this.router)
  }
}

