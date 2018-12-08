import {bindable} from 'aurelia-framework';
import './dep-tree.less'
import { HttpClient } from 'aurelia-fetch-client';

export class DepTree {
  @bindable value = 'DepTree';

  valueChanged(newValue, oldValue) {

  }

  bind() {
    this.getDepTree();
  }

  getDepTree() {
    let client = new HttpClient();

    client.fetch('http://localhost:3030/dep-tree')
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }
}
