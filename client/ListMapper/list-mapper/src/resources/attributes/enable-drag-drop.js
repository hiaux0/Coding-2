// draggel ^= draggedElement
// swappel ^= swappedElement

import {dynamicOptions, inject, TemplatingEngine} from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import interact from 'interactjs';
import { debounce } from 'lodash-decorators';
import { cloneDeep } from 'lodash';

@dynamicOptions
@inject(Element, EventAggregator, TemplatingEngine)
export class EnableDragDropCustomAttribute {
  constructor(element, eventAggregator, templatingEngine) {
    this.element = element;
    this.eventAggregator = eventAggregator;
    this.templatingEngine = templatingEngine;

    this.dragSortList;
    this.dragStarted = false;
    this.draggel = null;
    this.draggelShadowClone = null;
    this.dragShadowFromdraggel = null;
    this.elementsViewModel = null;
    this.elementsList = null;
    this.elementsListClone = null;
    this.hasProperties = false; // Whether the view gave this CA properties
    this.isCustomElement = false;

    window.edd = this;
  }
  
  attached() {
    if (!this.hasProperties) {
      this.initDraggable();
    }
    this.checkCustomElement(this.element);
  }

  /**
   * How to efficiently catch error other than try/catch
   */
  get draggelsData() {
    return this.elementsListClone
      .filter((listItem) => (listItem.htmlElement === this.draggel));
  }

  get draggelsPosition() {
    return this.draggelsData[0].position;
  }

  _getElementsListPosition(element) {
    return this.elementsListClone
      .filter((listItem) => (listItem.htmlElement === element))[0].position;
  }

  _getPotentialSwappel(index) {
    return this.elementsListClone[index].htmlElement;
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
   * Check if the given element is an aurelia custom element, and prepare variables
   */
  checkCustomElement(element) {
    if (typeof element.au.controller.viewModel !== "object") return;
    this.isCustomElement = true;
    this.elementsViewModel = element.au.controller.viewModel;
    this.elementsList = this.elementsViewModel.listData;
    this.elementsListClone = cloneDeep(this.elementsViewModel.listData);
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

  /**
   * Remove the drag shadow on drag end
   */
  onDragEnd = () => { // `onDragEnd` could also be named `onDrop`
    let element = this.dragShadowFromdraggel ;
    let parent = this.draggel.parentNode
    // parent.removeChild(element);
    this.checkValidDropDestination();
  }

  checkValidDropDestination() {
  // If drop is invalid place, place the original element back to its original position

  // If drop is valid place, drop the original element
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
    let draggel = event.target;
    window.draggel = draggel;
    this.draggel = draggel;

    this.draggelShadowClone = this.createShadowCopy(draggel);
    this.draggel.classList.add('drag-shadow');
  }

  // /**
  //  * When element is being dragged, create a shadow of it in the starting place.
  //  * @param {HTML.Element} draggel - The element that is being dragged.
  //  * @param {HTML.Element} container - The container, in which the shadow should appear
  //  *   This should usually be the "main" parent.
  //  */
  // createDragShadow = (draggel) => {
  //   return this.createShadowCopy(draggel);
  // }

  /**
   * TODO : Consider creating a custom element.
   *    Though, due to dynamic tags, is this even possible?
   *    Maybe just attach the whole element to a custom element and just add a "drag-shadow" class to it.
   * @param {HTML.Element} draggel 
   */
  createShadowCopy(draggel) {
    window.draggel = draggel;
    let originalCoords = draggel.getBoundingClientRect();
    let {left, top, width, height} = originalCoords;
    let clone = draggel.cloneNode(true) // true copies descendents as well

    clone.classList.remove('drag-active')
    clone.style.position = "absolute";
    clone.style.left = `${left}px`;
    clone.style.top = `${top}px`;
    clone.style.height = `${height}px`;
    clone.style.width = `${width}px`;

    window.clone = clone;
    this.dragShadowFromdraggel = clone;
    return clone;
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
      onmove: this.onDragMove,
      onstart: this.onDragStart,
    });
  }

  /**
   * This function was given by the interactjs demo
   * 
   * @param {Object} event 
   */
  onDragMove = (event) => {
    let draggel = this.draggel;
    // console.log('​EnableDragDropCustomAttribute -> onDragMove -> event.dy', event);
    // window.dragMoveEvent = event;

    // Create clone and drag that instead
    // let draggelClone = this.createDragShadow(draggel)
    let container = this.elementsViewModel.simpleListRef;
    container.prepend(clone);

    // keep the dragged position in the data-x/data-y attributes
    let x = (parseFloat(this.draggelShadowClone.getAttribute('data-x')) || 0) + event.dx;
    let y = (parseFloat(this.draggelShadowClone.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    this.draggelShadowClone.style.webkitTransform =
      this.draggelShadowClone.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    this.draggelShadowClone.setAttribute('data-x', x);
    this.draggelShadowClone.setAttribute('data-y', y);

    let direction = (event.dy > 0) ? "down" : "up"
    let movedDistance = Math.abs(event.clientY - event.clientY0)
    this._maybeSwappel(movedDistance, direction);
  }

  /**
   * Handle swap elements if necessary.
   * @param {Number} movedDistance
   * @param {String} direction 
   */
  _maybeSwappel(movedDistance, direction) {
    let getValue = this._getSwapThreshold(direction);
    if (!getValue) return;
    let {heightOfPotentialSwappel, potentialSwappel} = getValue;
    if (movedDistance > heightOfPotentialSwappel) {
      let swapToPosition = this._getElementsListPosition(potentialSwappel);
      // debugger;
      // console.log('​EnableDragDropCustomAttribute -> _maybeSwappel -> swapToPosition', swapToPosition);

      
      // console.log('​EnableDragDropCustomAttribute -> _maybeSwappel -> this.elementsList', this.elementsList);
      this.elementsList = this._swapViaPosition(this.draggelsPosition, swapToPosition, this.elementsListClone);
      // console.log('​EnableDragDropCustomAttribute -> _maybeSwappel -> this.elementsList', this.elementsList);
      this.eventAggregator.publish('drag-drop:draggel-swapped', this.elementsList);

    }
  }
  
  /**
   * If draggel moves pass a neighbouring element, 
   * shift the element to draggel original position
   * @param {HTML.Element} draggel - The element that is being dragged.
   * @return {Number} threshold - 
   */
  // @debounce(15) // 15 by experimenting. More will not listen to enough drag events. Less too much
  _getSwapThreshold(direction) {
    let potentialSwapPosition = (direction === 'down')
      ? this.draggelsPosition + 1
      : this.draggelsPosition - 1;

    let potentialSwappel = this._getPotentialSwappel(potentialSwapPosition);
    let heightOfPotentialSwappel = potentialSwappel.getBoundingClientRect().height;

    return ({
      heightOfPotentialSwappel, 
      potentialSwappel
    });
  }

  _swapViaPosition(from, to, arr) {
    let returnArr = cloneDeep(arr);
    let temp = returnArr[from]
    returnArr[from] = returnArr[to]
    returnArr[to] = temp;
    return returnArr;
  }

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