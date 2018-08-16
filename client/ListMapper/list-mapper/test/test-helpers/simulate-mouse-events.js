https://github.com/airbnb/enzyme/issues/1357

function simulateEvent(component, eventName, eventData) {
  const eventType = (() => {
    if (['mousedown', 'mousemove', 'mouseup'].includes(eventName)) { return 'MouseEvent'; }
  })();
  const event = new window[eventType](eventName, eventData);
  component.getDOMNode().dispatchEvent(event);
}