import {bindable} from 'aurelia-framework';
import {commandList} from '../../commandStorage/command-storage';
import './command-palett.less';
import hotkeys from 'hotkeys-js';

export class CommandPalett {
  @bindable value;

  constructor() {
    this.simpleCommand = null;
    this.showCommandPalett = false;
    this.key = 'name';
  }

  attached() {
    this.simpleCommand = commandList.simpleCommand;
    this.initShortCuts();
  }

  initShortCuts() {
    // Init hotkeys
    let hotkey = hotkeys.noConflict();
    hotkeys.filter = function () { return true }; // 2018-08-09 23:30:46 what does this do?

    hotkey('ctrl+;', () => {
      this.showCommandPalett = !this.showCommandPalett;
      console.log('yay')
    });
  }


}

