import { bindable } from 'aurelia-framework';
import db from '../../../../../../../../db'

export class DragDropV1Ce {
  @bindable value;

  constructor() {
    this.snap = true;
    this.listData = db.shortcuts;
    this.listDataCommands = db.commands;
  }

  attached() {
  }

  changeSnap() {
    this.snap = !this.snap;
  }
}

