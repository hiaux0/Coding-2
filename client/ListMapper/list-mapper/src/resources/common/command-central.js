import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {toggleHotkeyScope} from '../../application-key-bindings/toggle-scope';

@inject(EventAggregator)
export class CommandCentral {
  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
    this.subscribers = [];
  }

  subscribeToCommandEvents(commandData) {
    this.subscribers.push(
      this.eventAggregator.subscribe('command-palett:command-triggered', (commandId) => {
        let command = commandData[commandId];
        if (typeof command === 'function') { 
          command();
        }
      })
    );
  }

  detached() {
    this.subscribers.forEach((subscriber) => subscriber.dispose());
  }
}