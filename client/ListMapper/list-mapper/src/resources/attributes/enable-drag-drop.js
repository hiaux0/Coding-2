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

  get elementsListContainerInfo() {
    let reffel = this.elementsViewModel.simpleListRef;
    let reffelRect = reffel.getBoundingClientRect();
    return { reffel, reffelRect };
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
      onstart: this.onDragStart,
      onmove: this.onDragMove,
      onend: this.onDragEnd,
    });
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
    this.draggel = draggel;
    window.draggel = draggel;
    console.log("Drag start: ",draggel.innerHTML.trim());

    let clone = this._createShadowCopy(draggel);
    this.draggelShadowClone = clone;
    // let container = this.elementsViewModel.simpleListRef;
    let container = draggel.parentNode;
    container.prepend(clone);

    this.draggel.classList.add('drag-shadow');
  }

      /**
       * TODO : Consider creating a custom element.
       *    Though, due to dynamic tags, is this even possible?
       *    Maybe just attach the whole element to a custom element and just add a "drag-shadow" class to it.
       * @param {HTML.Element} draggel 
       */
      _createShadowCopy(draggel) {
        window.draggel = draggel;
        let originalCoords = draggel.getBoundingClientRect();
        let { top, width } = originalCoords;
        let clone = draggel.cloneNode(true) // true : copies descendents as well

        // clone.classList.add('drag-active')
        // clone.style.position = "absolute";
        // clone.style.top = `${top}px`;
        // clone.style.width = `${width}px`;

        return clone;
      }

  /**
   * This function was given by the interactjs demo
   * 
   * @param {Object} event 
   */
  onDragMove = (event) => {
    let parentsTop = this.elementsListContainerInfo.reffelRect.top; // Could also just use parent property of html element?

  }
  
  /**
   * Remove the drag shadow on drag end
   */
  onDragEnd = () => { // `onDragEnd` could also be named `onDrop`
    let element = this.draggelShadowClone;
    let parent = element.parentNode
    parent.removeChild(element);
    this.draggel.classList.remove('drag-shadow');
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