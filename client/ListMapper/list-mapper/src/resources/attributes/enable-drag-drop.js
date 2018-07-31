import {dynamicOptions, inject, TemplatingEngine} from 'aurelia-framework';
import interact from 'interactjs';

@dynamicOptions
@inject(Element, TemplatingEngine)
export class EnableDragDropCustomAttribute {
  constructor(element, templatingEngine) {
    this.element = element;
    this.templatingEngine = templatingEngine;

    this.isCustomElement = false;
    this.elementsViewModel = null;
    this.hasProperties = false; // Whether the view gave this CA properties
    this.dragSortList;
    this.dragStarted = false;
    this.draggedElement = null;

    window.edd = this;
  }
  
  attached() {
    if (!this.hasProperties) {
      this.initDraggable();
    }
    this.checkCustomElement(this.element);
  }

  propertyChanged(name) {
    this.hasProperties = true;
    switch(name) {
      case 'inertia':
        this.initDraggable({allowInertia: true});
        break;
    }

  }

  /**
   * Check if the given element is an aurelia custom element
   */
  checkCustomElement(element) {
    if (typeof element.au.controller.viewModel !== "object") return;
    this.isCustomElement = true;
    this.elementsViewModel = element.au.controller.viewModel;
    this.verifyCorrectDragDropSetup(this.elementsViewModel);
  }

  /**
   * In order ot use this custom attribute follow the convention.
   * @param {Aurelia.ViewModel.Object} viewModel
   */
  verifyCorrectDragDropSetup(viewModel) {
    // list data should be stored in `listData`
    if (typeof viewModel.listData === 'undefined') {
      throw new Error("EDD: Element's `listData` is empty ");
    }
    // console.error("TODO: Implement verifying of drag drop's element viewmodel")
  } 

  onDragEnd() {
    
  }

  /**
   * Handles logic when drag started:
   * * Save the dragged html element to a class variable.
   * 
   * * Note the arrow fnc notation, since we are passing this function to an event listener.
   * @param {Drag.Event.Object} event 
   */
  onDragStart = (event) => {
    this.dragStarted = true;
    let target = event.target;
    window.target = target;
    this.draggedElement = target;
    this.createDragShadow(target);
  }

  /**
   * When element is being dragged, create a shadow of it in the starting place.
   * @param {HTML.Element} draggedElement - The element that is being dragged.
   * @param {HTML.Element} container - The container, in which the shadow should appear
   *   This should usually be the "main" parent.
   */
  createDragShadow(draggedElement) {
    // Get the container
    let container = this.elementsViewModel.simpleListRef;
    console.log(container);
  // Place shadow of draggedElement into container
    // Create a copy of the element
    this.createShadowCopy(draggedElement);
  }

  /**
   * TODO : Consider creating a custom element.
   *    Though, due to dynamic tags, is this even possible?
   *    Maybe just attach the whole element to a custom element and just add a "drag-shadow" class to it.
   * @param {HTML.Element} draggedElement 
   */
  createShadowCopy(draggedElement) {
    window.draggedElement = draggedElement;
    let originalCoords = draggedElement.getBoundingClientRect();
    let {left, top, width, height} = originalCoords;

    let clone = draggedElement.cloneNode(true) // true copies descendents as well
    clone.classList.add('drag-shadow')
    clone.style.position = "absolute";
    clone.style.left = `${left}px`;
    clone.style.top = `${top}px`;
    clone.style.height = `${height}px`;
    clone.style.width = `${width}px`;

    window.clone = clone;

    let container = this.elementsViewModel.simpleListRef.prepend(clone);
    window.container = container;
  }



  initDraggable(options) {
    if (typeof options === 'undefined') {
      options = {};
    }

    interact('li', {
      context: this.element
    })
    .draggable({
      inertia: options.allowInertia || false ,
      autoScroll: true,
      // Restrict to vertical movement of element only
      restrict: {
        restriction: ".simple-list",
        elementRect: {top: 0, left: 0, bottom: 1, right: 1}
      },
      onend: this.onDragEnd,
      onmove: dragMoveListener,
      onstart: this.onDragStart,
    });
  }
}

/**
 * This function was given by the interactjs demo
 * 
 * @param {Object} event 
 */
const dragMoveListener = (event) => {
  // window.dragMoveEvent = event;

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

/**
 * 2018-07-31 22:36:55 I wanted to use an custom element for the drag shadow. But I just cloned the element and appended it to the list, adjusted the styles via a 'drag-shadow' class, and it worked well.
 * 
 * Function taken from 
 * https://ilikekillnerds.com/2016/01/enhancing-at-will-using-aurelias-templating-engine-enhance-api/
 */
const letsEnhance = (elementToBeEnhanced, viewModel) => {
  let el = document.getElementsByTagName(tagName);
  if (!el) return;
  if (el.querySelectorAll('.au-target').length) return;
  this.templatingEngine.enhance({ element: elementToBeEnhanced, bindingContext: viewModel });
}