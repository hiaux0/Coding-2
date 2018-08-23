// https://ghostinspector.com/blog/simulate-drag-and-drop-javascript-casperjs/

export const triggerDragAndDrop = function (selectorDrag, selectorDrop) {
console.log('​exporttriggerDragAndDrop -> triggerDragAndDrop');

  // function for triggering mouse events
  let fireMouseEvent = function (type, elem, centerX, centerY) {
    let evt = document.createEvent('MouseEvents');
    evt.initMouseEvent(type, true, true, window, 1, 1, 1, centerX, centerY, false, false, false, false, 0, elem);
    elem.dispatchEvent(evt);
  };

  // fetch target elements
  let elemDrag = document.querySelector(selectorDrag);
  let elemDrop = document.querySelector(selectorDrop);
  if (!elemDrag || !elemDrop) return false;

  // calculate positions
  let pos = elemDrag.getBoundingClientRect();
  console.log('​exporttriggerDragAndDrop -> pos', pos);
  let center1X = Math.floor((pos.left + pos.right) / 2);
  let center1Y = Math.floor((pos.top + pos.bottom) / 2);
  pos = elemDrop.getBoundingClientRect();
  let center2X = Math.floor((pos.left + pos.right) / 2);
  let center2Y = Math.floor((pos.top + pos.bottom) / 2);
  
  // mouse over dragged element and mousedown
  fireMouseEvent('mousemove', elemDrag, center1X, center1Y);
  fireMouseEvent('mouseenter', elemDrag, center1X, center1Y);
  fireMouseEvent('mouseover', elemDrag, center1X, center1Y);
  fireMouseEvent('mousedown', elemDrag, center1X, center1Y);

  // start dragging process over to drop target
  fireMouseEvent('dragstart', elemDrag, center1X, center1Y);
  fireMouseEvent('drag', elemDrag, center1X, center1Y);
  fireMouseEvent('mousemove', elemDrag, center1X, center1Y);
  fireMouseEvent('drag', elemDrag, center2X, center2Y);
  fireMouseEvent('mousemove', elemDrop, center2X, center2Y);
  
  // trigger dragging process on top of drop target
  fireMouseEvent('mouseenter', elemDrop, center2X, center2Y);
  fireMouseEvent('dragenter', elemDrop, center2X, center2Y);
  fireMouseEvent('mouseover', elemDrop, center2X, center2Y);
  fireMouseEvent('dragover', elemDrop, center2X, center2Y);
  
  // release dragged element on top of drop target
  fireMouseEvent('drop', elemDrop, center2X, center2Y);
  console.log('​exporttriggerDragAndDrop -> drop');
  fireMouseEvent('dragend', elemDrag, center2X, center2Y);
  fireMouseEvent('mouseup', elemDrag, center2X, center2Y);

  return true;
};