import {inject} from 'aurelia-framework';
import interact from 'interactjs';


/**
 * This function was given by the interactjs demo
 * 
 * @param {Object} event 
 */
const dragMoveListener = (event) => {
  var target = event.target,
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

@inject(Element)
export class EnableDragDropCustomAttribute {
  constructor(element) {
    this.element = element;
    window.edd = this;
  }

  valueChanged(newValue, oldValue) {

  }

  attached() {
    console.log(this.element)
    this.draggableDemo();
  }

  draggableDemo() {
    // First arg is the target
    interact('li', {
      context: this.element
    })
      .draggable({
        inertia: true,
        autoScroll: true,
        onmove: dragMoveListener,
        // keep the element within the area of it's parent
        // > Note the following code did not allowed the dragged element to stay at the drag position.
        // > It rather moved the dragged element automatically to the top left.
        // > NEEDTO investigate its behavior more
        // restrict: {
        //   restriction: "parent",
        //   endOnly: true,
        //   elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        // },
      });
  }

}

