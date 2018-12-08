import {bindable} from 'aurelia-framework';
import './dep-tree.less'
import { HttpClient } from 'aurelia-fetch-client';
import hotkeys from 'hotkeys-js';


export class DepTree {
  @bindable value = 'DepTree';

  depTree;

  bind() {
    this.getDepTree();
    hotkeys("c", () => console.clear()); // eslint-disable-line no-console
    hotkeys("h", () => console.log(this));  // eslint-disable-line no-console
  }


  getDepTree() {
    let client = new HttpClient();

    client.fetch('http://localhost:3030/dep-tree')
      .then(response => response.json())
      .then(data => {
        this.depTree = new Map(data);
        console.log(data);
      });
  }
}
