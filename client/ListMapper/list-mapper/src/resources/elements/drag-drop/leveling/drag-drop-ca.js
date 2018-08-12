import {bindable} from 'aurelia-framework';
import db from '../../../../../../../../db'

export class DragDropCa {
  @bindable value;

  constructor() {
    this.snap = true;
    this.listData = db.shortcuts;
  }

  changeSnap() {
    this.snap = !this.snap;
  }
}

