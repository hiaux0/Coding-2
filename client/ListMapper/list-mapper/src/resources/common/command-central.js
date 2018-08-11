import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class CommandCentral {
  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
    this.subscribers = [];
  }

  // attached() {
  //   console.log('command central attached')
  //   this.subscribeToCommandEvents();
  // }

  subscribeToCommandEvents() {
    console.log('sub to command events')
    this.subscribers.push(
      this.eventAggregator.subscribe('command-palett:command-triggered', (commandId) => {
        console.log(commandId);
      })
    )
  }
}