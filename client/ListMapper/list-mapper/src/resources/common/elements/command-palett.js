import {bindable, inject, observable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {commandList} from '../../commandStorage/command-storage';
import hotkeys from 'hotkeys-js';

import {COMMAND_PALETT} from '../../../application-key-bindings/app.keys'

import './command-palett.less';

@inject(EventAggregator)
export class CommandPalett {
  @bindable value;
  @observable commandId;

  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
    this.simpleCommand = null;
    this.showCommandPalett = false;
    this.key = 'name';
  }

  commandIdChanged() {
    this.eventAggregator.publish('command-palett:command-triggered', this.commandId);
    this.showCommandPalett = false;
    this.commandId = ''; // reset the commandId
  }

  attached() {
    this.simpleCommand = commandList.simpleCommand;
    this.initShortCuts();
    this.debugMode();
  }

  initShortCuts() {
    // Init hotkeys
    let hotkey = hotkeys.noConflict();
    hotkeys.filter = function () { return true }; // 2018-08-09 23:30:46 what does this do?

    hotkey(COMMAND_PALETT, () => {
      this.showCommandPalett = !this.showCommandPalett;
      // TODO a1ab98jhc : Check if hotkeys dont accumulate
      console.log('COMMAND_PALETT toggling')
    });
  }

  debugMode() {
    if (!window.DEBUG_MODE.commandPalett) return;
    // debug code, always show command palett. Note that just by setting the constructor value to true, doesn't work, since it seems like component are not loading in order
    window.setTimeout(() => {
      this.showCommandPalett = true;
    }, 0)
  }

}

