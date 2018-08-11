import {inject} from 'aurelia-framework';
import hotkeys from 'hotkeys-js';

@inject(Element)
export class UpDownNavigationCustomAttribute {
  constructor(element) {
    this.element = element;
    this.hotkey = null;
    console.log('updown')
  }

  attached() {
    this.initShortCuts();
    this.upNavigation();
    this.downNavigation();
  }

  initShortCuts() {
    // Init hotkeys
    this.hotkey = hotkeys.noConflict();
    hotkeys.filter = function () { return true }; // 2018-08-09 23:30:46 what does this do?
  }

  upNavigation() {
    this.hotkey('up', () => {
      console.log('up')
    })
  }

  downNavigation() {
    this.hotkey('down', () => {
      console.log('down')
    })
  }

  valueChanged(newValue, oldValue) {

  }
}

