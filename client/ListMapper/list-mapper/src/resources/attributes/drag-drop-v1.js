import {inject} from 'aurelia-framework';
import interact from 'interactjs';

@inject(Element)
export class  dragDropV1CustomAttribute {

  constructor(element) {
    this.element = element;

    this.dragStarted = false;
    this.draggel = null;
    this.draggelShadowClone= null;
    this.elementsList = null;
    this.elementsViewModel = null;
    this.isCustomElement = false;
  }

  get elementsListContainerInfo() {
    let reffel = this.elementsViewModel.simpleListRef;
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
    this.isCustomElement = true;
    this.elementsViewModel = element.au.controller.viewModel;
    this.elementsList = this.elementsViewModel.listData;
    // this.elementsListClone = cloneDeep(this.elementsViewModel.listData);
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
        window.dragStartEvent = event;
        this.dragStarted = true;
        let target = event.target;
        let draggel = target.getElementsByTagName('li')[0];
        this.draggel = draggel;
        window.draggel = draggel;
        console.log("Drag start: ", draggel.innerHTML.trim());

        let clone = this._createShadowCopy(draggel);
        this.draggelShadowClone = clone;
        // let dropDestination = draggel.nextElementSibling;
        let dropDestination = this.elementsViewModel.simpleListRef;
        dropDestination.prepend(clone);
        this._addDraggelStyles(draggel)
      }
      
          _addDraggelStyles(draggel) {
            draggel.classList.add('is-draggel');
          }

          _removeDraggelStyles(draggel) {
            // Remove transform dynamic css property (from interactjs)
            let item = draggel.getElementsByTagName('li')[0];
            draggel.style.transform = null;
            let a = draggel.setAttribute('data-y', 0);
            
            draggel.classList.remove('is-draggel');
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

            // clone.classList.add('is-draggel');
            clone.classList.add('drag-shadow');
            clone.style.position = "absolute";
            clone.style.top = `${top}px`;
            clone.style.width = `${width}px`;

            return clone;
          }

      /**
       * This function was given by the interactjs demo
       * 
       * @param {Object} event 
       */
      onDragMove = (event) => {
        let target = event.target;
        let draggel = target.getElementsByTagName('li')[0];
        let parentsTop = this.elementsListContainerInfo.reffelRect.top; // Could also just use parent property of html element?

        // keep the dragged position in the data-x/data-y attributes
        let x = (parseFloat(draggel.getAttribute('data-x')) || 0) + event.dx;
        let y = (parseFloat(draggel.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        draggel.style.webkitTransform =
          draggel.style.transform =
          `translate(${0}px, ${y}px)`; // `0` only allows vertical movement

        // update the position attributes
        draggel.setAttribute('data-x', x);
        draggel.setAttribute('data-y', y);

        let direction = (event.dy > 0) ? "down" : "up"
        let movedDistance = Math.abs(event.clientY - event.clientY0)
        // this._maybeSwappel(movedDistance, direction);
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

  initDropZone() {
    interact('.dropzone').dropzone({
      // only accept elements matching this CSS selector
      accept: '.draggel-container, .draggable',
      ondragenter: this.ondDragEnter,
      ondragleave: this.onDragLeave,
      ondrop: this.onDrop
    })
  }

      ondDragEnter = (event) => {
        let dropZone = event.target;
        // dropZone.classList.add("hover")
        window.dragEvent = event
        console.log('drag enter')
      }

      onDragLeave = (event) => {
        let dropZone = event.target;
        dropZone.classList.remove("hover")
        console.log('drag leave')
      }

      /**
       * Note, that we are wrapping our <li> with <span class="">. So in the code be aware of 
       * draggel, being the actual dragged element <li>, and `relatedTarget` is the wrapper.
       * Normally, in interactjs, `relatedTarget` has the actual draggel
       * 
       * @param {Object} event
       */
      onDrop = (event) => {
        window.dropEvent = event;
        let dropZone = event.target.parentElement;
        console.log('Dropped into zone after: ', dropZone.children[0].innerHTML.trim())
        window.dropZone = dropZone;

        let relatedTarget = event.relatedTarget; // also this.draggel
        let draggel = relatedTarget.getElementsByTagName('li')[0];
        window.draggel = draggel

        // remove draggel 
        let reffel = this.elementsListContainerInfo.reffel;
        reffel.removeChild(relatedTarget)
        // insert at right location
        this._removeDraggelStyles(draggel);
        dropZone.insertAdjacentElement('afterEnd', relatedTarget)

        console.log('dropped in dropzone')
      }
  
}
