import {inject} from 'aurelia-framework';
import interact from 'interactjs';

@inject(Element)
export class  dragDropV1CustomAttribute {

  constructor(element) {
    this.element = element;
    /**
     * Summarizes all options
     */
    this.dd = {
      dragStarted:         false,
      draggelShadowClone:   null,
      // elementsList:        null,
      elementsViewModel:   null,
      isCustomElement:     false,
      isValidDropLocation: false,
    }
  }

  get elementsListContainerInfo() {
    let reffel = this.element.au.controller.viewModel.simpleListRef;
    let reffelRect = reffel.getBoundingClientRect();
    return { reffel, reffelRect };
  }

  attached() {
    this.checkCustomElement(this.element);
    this.initDraggable();
    this.initDropZone();
  }

  /**
   * Check if the given element is an aurelia custom element, and prepare variables
   */
  checkCustomElement(element) {
    if (typeof element.au.controller.viewModel !== "object") return;

    this.dd.isCustomElement   = true;
    this.dd.elementsViewModel = element.au.controller.viewModel;
    // this.dd.elementsList      = this.dd.elementsViewModel.listData;
    
    this._verifyCorrectDragDropSetup(this.dd.elementsViewModel);
  }

      /**
       * In order ot use this custom attribute follow the convention.
       * @param {Aurelia.ViewModel.Object} viewModel
       */
      _verifyCorrectDragDropSetup(viewModel) {
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

    interact('.item-container, .draggable', {
      context: this.element
    }).draggable({
      inertia: options.allowInertia || false,
      autoScroll: true,
      // Restrict to vertical movement of element only
      restrict: {
        restriction: ".simple-list",
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      },
      onstart: this.onDragStart,
      onmove:  this.onDragMove,
      onend:   this.onDragEnd,
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
        let draggelContainer = event.target;
        let draggel          = draggelContainer.getElementsByTagName('li')[0];
        let clone            = this._createShadowCopy(draggel);
        
        this.dd.dragStarted        = true;
        this.dd.draggelShadowClone = clone;

        // `dropDestination` does not describe what is happening here...
        let dropDestination = this.dd.elementsViewModel.simpleListRef; 
        dropDestination.prepend(clone);

        this._saveDraggelOriginInfo(draggelContainer);
        this._addDraggelStyles(draggel);
      }

          /**
           * Before dragging, save location of draggel origin.
           */
          _saveDraggelOriginInfo = (target) => target.getBoundingClientRect();
          _addDraggelStyles(draggel) { draggel.classList.add('is-draggel'); }

          /**
           * Remove transform dynamic css property (from interactjs).
           * Remove css classes added for drag ui.
           * 
           * @param {HTML.Element} draggel 
           */
          _removeDraggelStyles(draggel) {
            draggel.style.transform = null;
            draggel.setAttribute('data-y', 0);
            this._removeDraggelCssClasses(draggel)
          }
          
              _removeDraggelCssClasses(draggel) {
                draggel.classList.remove('is-draggel');
                this._removeDragEnterStyling(draggel);
                this._removeDragLeaveStyling(draggel);
              }

          /**
           * TODO : Consider creating a custom element.
           *    Though, due to dynamic tags, is this even possible?
           *    Maybe just attach the whole element to a custom element and just add a "drag-shadow" class to it.
           * @param {HTML.Element} draggel 
           */
          _createShadowCopy(draggel) {
            let originalCoords = draggel.getBoundingClientRect();
            let { top, width } = originalCoords;
            let clone = draggel.cloneNode(true) // true : copies descendents as well

            let parentContainer = this.elementsListContainerInfo.reffelRect.top;

            clone.classList.add('drag-shadow');
            clone.style.position = "absolute";
            clone.style.top = `${top - parentContainer}px`;
            clone.style.width = `${width}px`;

            return clone;
          }

      /**
       * This function was given by the interactjs demo
       * 
       * @param {Object} event 
       */
      onDragMove = (event) => {
        let draggelContainer = event.target;
        let draggel = draggelContainer.getElementsByTagName('li')[0];

        // keep the dragged position in the data-x/data-y attributes
        let x = (parseFloat(draggel.getAttribute('data-x')) || 0) + event.dx;
        let y = (parseFloat(draggel.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        draggel.style.webkitTransform =
          draggel.style.transform =
          `translate(${0}px, ${y}px)`; // `0` only allows vertical movement

        // update the position attributes // 2018-08-05 22:11:24 Can be used for history
        draggel.setAttribute('data-x', x);
        draggel.setAttribute('data-y', y);
      }

      /**
        * Remove the drag shadow on drag end
        */
      onDragEnd = (event) => { // `onDragEnd` could also be named `onDrop`
        let draggelContainer = event.target;
        let draggel = draggelContainer.getElementsByTagName('li')[0];
        let clone = this.dd.draggelShadowClone;
        this._removeClone(clone);
        this._removeDraggelStyles(draggel);
        if (!this.dd.isValidDropLocation) {
          return;
        }
      }

          _removeClone(clone) {
            let parent = clone.parentNode
            parent.removeChild(clone);
          }

  initDropZone() {
    interact('.dropzone').dropzone({
      accept: '.draggel-container, .draggable',
      ondragenter: this.ondDragEnter,
      ondragleave: this.onDragLeave,
      ondrop:      this.onDrop,
    })
  }

      ondDragEnter = (event) => {
        let draggelContainer = event.relatedTarget;
        let draggel = draggelContainer.getElementsByTagName('li')[0];

        this.dd.isValidDropLocation = true;

        this._addDragEnterStyling(draggel);
        this._removeDragLeaveStyling(draggel);
      }

          _addDragEnterStyling(draggel)    { draggel.classList.add('drag-entered'); }
          _removeDragLeaveStyling(draggel) { draggel.classList.remove('drag-left') }


      onDragLeave = (event) => {
        let draggelContainer = event.relatedTarget;
        let draggel = draggelContainer.getElementsByTagName('li')[0];
        let dropZone = event.target;
        
        this._addDragLeaveStyling(draggel);
        this._removeDragEnterStyling(draggel);
        this.dd.isValidDropLocation = false;

        dropZone.classList.remove("hover")
      }

          _addDragLeaveStyling(draggel)    { draggel.classList.add('drag-left') }
          _removeDragEnterStyling(draggel) { draggel.classList.remove('drag-entered') }

      /**
       * Note, that we are wrapping our <li> with <span class="">. So in the code be aware of 
       * draggel, being the actual dragged element <li>, and `relatedTarget` is the wrapper.
       * Normally, in interactjs, `relatedTarget` has the actual draggel
       * 
       * @param {Object} event
       */
      onDrop = (event) => {
        let draggelContainer = event.relatedTarget;
        let draggel = draggelContainer.getElementsByTagName('li')[0];
        let dropZone = event.target.parentElement;

        this._removeDraggelStyles(draggel);

        let parent = draggelContainer.parentElement;
        parent.removeChild(draggelContainer)

        dropZone.insertAdjacentElement('afterEnd', draggelContainer)
      }
}
