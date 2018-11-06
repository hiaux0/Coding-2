import {bindable} from 'aurelia-framework';
import './codesoc-todo.less'

export class CodesocTodo {
  @bindable value = 'connected';

  valueChanged(newValue, oldValue) {

  }
}
