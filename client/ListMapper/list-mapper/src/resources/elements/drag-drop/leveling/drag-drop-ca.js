import {bindable} from 'aurelia-framework';
import db from '../../../../../../../../db'

export class DragDropCa {
  @bindable value;

  constructor() {
    this.snap = true;
    this.listData = db.shortcuts;
  }

  attached() {
    // this.snap = true;
    // console.log(this.simpleListVM)
    // console.log(this.abc)
  }

  bind() {
    // this.snap = true;
  }
   
  changeSnap() {
    this.snap = !this.snap;
  }
}

