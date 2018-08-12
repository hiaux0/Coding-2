import {bindable} from 'aurelia-framework';
import db from '../../../../../../../../db';
import './drag-drop-connect-items.less'

export class DragDropConnectItems {

  constructor() {
    this.listData = db.shortcuts;
  }

}

