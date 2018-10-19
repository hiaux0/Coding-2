import {bindable, inject} from 'aurelia-framework';
import interact from 'interactjs';

@inject(Element)
export class EnableDragCustomAttribute {
  @bindable allowFrom = '.drag-button';
  // Note that when I later want to save the block coords into history, the zoom
  // modes need to be taken into consideration as well.
  @bindable scaleCoords;

  constructor(element) {
    this.element = element;
  }

  attached() {
    this.initDraggable();
  }

  initDraggable(options) {
    if (typeof options === 'undefined') {
      options = {};
    }

    let interactObj = interact(this.element)
      .draggable({
        allowFrom: `.${this.allowFrom}`, 
        // allowFrom: '.drag-button', 
        inertia: options.allowInertia || false,
        autoScroll: true,
        onmove: this.onDragMove,
      });

  }

  onDragMove = (event) => {
    var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.webkitTransform = target.style.transform =
      `translate(${x}px, ${y}px) scale(${1 / this.scaleCoords}, ${1 / this.scaleCoords})`

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

}
